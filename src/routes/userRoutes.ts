import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser, changeUserRole, confirmUserEmail } from '../controllers/userController';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/users/register', registerUser);
router.post('/users/login', loginUser);
router.get('/users/me', authMiddleware, getCurrentUser);
router.put('/users/:id/role', authMiddleware, isAdmin, changeUserRole);
router.get('/users/confirm/:token', confirmUserEmail);

export default router;