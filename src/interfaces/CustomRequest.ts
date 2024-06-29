import { Request } from 'express';

interface TokenPayload {
  id: number;
  role: number;
}

export interface CustomRequest extends Request {
  user?: TokenPayload;
}
