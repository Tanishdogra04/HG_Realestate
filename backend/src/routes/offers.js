// src/routes/offers.js
import express from 'express';
import { getOffers, createOffer, deleteOffer } from '../controllers/offerController.js';
import { protect } from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';

const router = express.Router();

router.get('/', getOffers);
router.post('/', protect, roleCheck('admin'), createOffer);
router.delete('/:id', protect, roleCheck('admin'), deleteOffer);

export default router;
