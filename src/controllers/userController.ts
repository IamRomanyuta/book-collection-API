import { Request, Response } from 'express';
import { CustomRequest } from '../interfaces/CustomRequest';
import { register, login } from '../services/authService';
import { getUserById, updateUserRole } from '../services/userService';
import { sendConfirmationEmail } from '../utils/email';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware';

export const registerUser = async (req: CustomRequest, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Проверка на существование пользователя с таким же логином или email
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким логином или email уже существует' });
    }

    // Создание нового пользователя
    const user = await register(username, email, password);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    // Отправка письма для подтверждения email
    await sendConfirmationEmail(user.email, token);

    res.status(201).json(user);
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
  }
};

export const loginUser = async (req: CustomRequest, res: Response) => {
  const { username, password } = req.body;

  try {
    const token = await login(username, password);
    if (!token) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    res.json({ token });
  } catch (error) {
    console.error('Ошибка при входе пользователя:', error);
    res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
  }
};

export const getCurrentUser = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await getUserById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error('Ошибка при получении текущего пользователя:', error);
    res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
  }
};

export const changeUserRole = [
  authMiddleware,
  isAdmin,
  async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
      const user = await updateUserRole(Number(id), role);
      res.json(user);
    } catch (error) {
      console.error('Ошибка при изменении роли пользователя:', error);
      res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
    }
  },
];

export const confirmUserEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    const user = await prisma.user.update({
      where: { id: decoded.id },
      data: { emailVerified: true },
    });

    res.status(200).json({ message: 'Email успешно подтвержден!' });
  } catch (error) {
    console.error('Ошибка при подтверждении email:', error);
    res.status(400).json({ error: 'Неверный или просроченный токен' });
  }
};
