import { Response } from 'express';
import { CustomRequest } from '../interfaces/CustomRequest';
import { register, login } from '../services/authService';
import { getUserById, updateUserRole } from '../services/userService';

export const registerUser = async (req: CustomRequest, res: Response) => {
  const { username, email, password } = req.body;
  const user = await register(username, email, password);
  res.status(201).json(user);
};

export const loginUser = async (req: CustomRequest, res: Response) => {
  const { username, password } = req.body;
  const token = await login(username, password);
  if (!token) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  res.json({ token });
};

export const getCurrentUser = async (req: CustomRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const user = await getUserById(req.user.id);
  res.json(user);
};

export const changeUserRole = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = await updateUserRole(Number(id), role);
  res.json(user);
};
