import express from 'express';
import { getAllInvoices, getInvoiceById, createInvoice, updateInvoiceStatus } from '../controllers/invoiceController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, restrictTo('admin'), getAllInvoices);
router.get('/:id', protect, getInvoiceById);
router.post('/', protect, restrictTo('admin'), createInvoice);
router.put('/:id/status', protect, restrictTo('admin'), updateInvoiceStatus);

export { router as invoiceRoutes };