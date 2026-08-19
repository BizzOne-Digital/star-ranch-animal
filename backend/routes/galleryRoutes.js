import express from 'express';
import {
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  updateGalleryMeta,
  deleteGalleryItem,
  reorderGallery,
} from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

const uploadGalleryImage = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

router.get('/', getGallery);
router.post('/', protect, uploadGalleryImage, createGalleryItem);
router.put('/reorder', protect, reorderGallery);
router.patch('/:id', protect, updateGalleryMeta);
router.put('/:id', protect, uploadGalleryImage, updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

export default router;
