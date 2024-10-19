import express from 'express';
import { getCart, addToCart, removeFromCart, updateCartItemQuantity, clearCart } from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.delete('/remove/:productId', protect, removeFromCart);
router.put('/update/:productId', protect, updateCartItemQuantity);
router.delete('/clear', protect, clearCart);

export { router as cartRoutes };