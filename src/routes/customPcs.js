import express from 'express';
import { getAllCustomPcs, getCustomPcById, createCustomPc, updateCustomPc, deleteCustomPc } from '../controllers/customPcController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getAllCustomPcs);
router.get('/:id', protect, getCustomPcById);
router.post('/', protect, createCustomPc);
router.put('/:id', protect, updateCustomPc);
router.delete('/:id', protect, deleteCustomPc);

export { router as customPcRoutes };