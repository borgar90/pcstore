import express from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrderStatus } from '../controllers/orderController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, restrictTo('admin'), getAllOrders);
router.get('/:id', protect, getOrderById);
router.post('/', protect, createOrder);
router.put('/:id/status', protect, restrictTo('admin'), updateOrderStatus);

export { router as orderRoutes };