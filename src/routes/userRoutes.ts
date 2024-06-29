import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser, changeUserRole } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getCurrentUser);
router.put('/:id/role', authMiddleware, changeUserRole);

export default router;
