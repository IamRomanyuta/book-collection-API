import { Router } from 'express';
import { addBook, getBooksList, getBook, updateBookDetails, deleteBook } from '../controllers/bookController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, addBook);
router.get('/', getBooksList);
router.get('/:id', getBook);
router.put('/:id', authMiddleware, updateBookDetails);
router.delete('/:id', authMiddleware, deleteBook);

export default router;
