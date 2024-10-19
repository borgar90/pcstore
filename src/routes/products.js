import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getFeaturedProducts, getMainFeaturedProduct, setMainFeatured, setFeaturedSlider, setFeaturedProduct } from '../controllers/productController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', protect, restrictTo('admin'), createProduct);
router.put('/:id', protect, restrictTo('admin'), updateProduct);
router.delete('/:id', protect, restrictTo('admin'), deleteProduct);

router.get('/featured', getFeaturedProducts);
router.get('/main-featured', getMainFeaturedProduct);
router.post('/main-featured', protect, restrictTo('admin'), setMainFeatured);
router.post('/featured-slider', protect, restrictTo('admin'), setFeaturedSlider);
router.post('/featured-product', protect, restrictTo('admin'), setFeaturedProduct);

export { router as productRoutes };