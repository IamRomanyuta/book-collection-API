import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../interfaces/CustomRequest';

interface TokenPayload {
  id: number;
  role: number;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    req.user = decoded;  // <-- добавляем user к запросу
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};
