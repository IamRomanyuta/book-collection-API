import { PrismaClient, User as UserModel } from '@prisma/client';
import prisma from '../prisma';

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};

export const updateUserRole = async (id: number, role: number) => {
  const user = await prisma.user.update({
    where: { id },
    data: { role },
  });
  return user;
};
