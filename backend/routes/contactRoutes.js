import express from 'express';
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
  getContactStats,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createContact);
router.get('/', protect, getContacts);
router.get('/stats', protect, getContactStats);
router.get('/:id', protect, getContactById);
router.put('/:id', protect, updateContact);
router.delete('/:id', protect, deleteContact);

export default router;
