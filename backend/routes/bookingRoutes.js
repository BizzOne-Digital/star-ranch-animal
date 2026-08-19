import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingStats,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadMultiple } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', uploadMultiple.array('photos', 5), createBooking);
router.get('/', protect, getBookings);
router.get('/stats', protect, getBookingStats);
router.get('/:id', protect, getBookingById);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

export default router;
