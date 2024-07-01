import express from 'express';
import { addBook, getBooksList, getBook, updateBookDetails, deleteBook } from '../controllers/bookController';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/books', authMiddleware, isAdmin, addBook);
router.get('/books', authMiddleware, getBooksList);
router.get('/books/:id', authMiddleware, getBook);
router.put('/books/:id', authMiddleware, isAdmin, updateBookDetails);
router.delete('/books/:id', authMiddleware, isAdmin, deleteBook);

export default router;

