import express from 'express';
import * as galleryController from '../controllers/galleryController';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.fields([
  { name: 'mainPhoto', maxCount: 1 },
  { name: 'photos', maxCount: 10 }
]), galleryController.createGallery);

router.get('/:id', galleryController.getGallery);

router.put('/:id', upload.fields([
  { name: 'mainPhoto', maxCount: 1 },
  { name: 'photos', maxCount: 10 }
]), galleryController.updateGallery);

router.delete('/:id', galleryController.deleteGallery);

export default router;
