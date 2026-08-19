import express from 'express';
import {
  createDonation,
  getDonations,
  updateDonation,
  deleteDonation,
} from '../controllers/donationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createDonation);
router.get('/', protect, getDonations);
router.put('/:id', protect, updateDonation);
router.delete('/:id', protect, deleteDonation);

export default router;
