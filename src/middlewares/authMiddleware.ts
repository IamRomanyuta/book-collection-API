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
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 0) {
    return res.status(403).send({ error: 'Access denied' });
  }
  next();
};
