import { PrismaClient, Book as BookModel } from '@prisma/client';
import prisma from '../prisma';

export const createBook = async (data: Omit<BookModel, 'id'>) => {
  const book = await prisma.book.create({
    data: {
      ...data,
      publicationDate: new Date(data.publicationDate),
    },
  });
  return book;
};

export const getBooks = async () => {
  const books = await prisma.book.findMany();
  return books;
};

export const getBookById = async (id: number) => {
  const book = await prisma.book.findUnique({ where: { id } });
  return book;
};

export const updateBook = async (id: number, data: Partial<BookModel>) => {
  const book = await prisma.book.update({
    where: { id },
    data: {
      ...data,
      publicationDate: data.publicationDate ? new Date(data.publicationDate) : undefined,
    },
  });
  return book;
};

export const deleteBook = async (id: number) => {
  await prisma.book.delete({ where: { id } });
};
