import { Request, Response } from 'express';
import { createBook, getBooks, getBookById, updateBook, deleteBook as deleteBookService } from '../services/bookService';
import { CustomRequest } from '../interfaces/CustomRequest';

export const addBook = async (req: CustomRequest, res: Response) => {
  const { title, author, publicationDate, genres } = req.body;
  const book = await createBook({
    title,
    author,
    publicationDate,
    genres,
    createdById: req.user!.id,
  });
  res.status(201).json(book);
};

export const getBooksList = async (req: Request, res: Response) => {
  const books = await getBooks();
  res.json(books);
};

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await getBookById(Number(id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
};

export const updateBookDetails = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { title, author, publicationDate, genres } = req.body;
  const book = await updateBook(Number(id), { title, author, publicationDate, genres });
  res.json(book);
};

export const deleteBook = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  await deleteBookService(Number(id));
  res.status(204).send();
};
