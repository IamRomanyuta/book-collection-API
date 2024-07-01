import { Request, Response } from 'express';
import { createBook, getBooks, getBookById, updateBook, deleteBook as deleteBookService } from '../services/bookService';
import { CustomRequest } from '../interfaces/CustomRequest';

export const addBook = async (req: CustomRequest, res: Response) => {
  const { title, author, publicationDate, genres } = req.body;
  try {
    const book = await createBook({
      title,
      author,
      publicationDate,
      genres,
      createdById: req.user!.id,
    });
    res.status(201).json(book);
  } catch (error) {
    console.error('Ошибка при добавлении книги:', error);
    res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
  }
};

export const getBooksList = async (req: Request, res: Response) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (error) {
    console.error('Ошибка при получении списка книг:', error);
    res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
  }
};

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await getBookById(Number(id));
    if (!book) return res.status(404).json({ error: 'Книга не найдена' });
    res.json(book);
  } catch (error) {
    console.error('Ошибка при получении книги:', error);
    res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
  }
};

export const updateBookDetails = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { title, author, publicationDate, genres } = req.body;
  try {
    const book = await updateBook(Number(id), { title, author, publicationDate, genres });
    res.json(book);
  } catch (error) {
    console.error('Ошибка при обновлении книги:', error);
    res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
  }
};

export const deleteBook = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  try {
    await deleteBookService(Number(id));
    res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении книги:', error);
    res.status(500).json({ error: 'Ошибка сервера. Попробуйте позже.' });
  }
};

