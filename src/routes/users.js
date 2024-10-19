import express from 'express';
import { getAllUsers, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, restrictTo('admin'), getAllUsers);
router.get('/:id', protect, getUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, restrictTo('admin'), deleteUser);

export { router as userRoutes };