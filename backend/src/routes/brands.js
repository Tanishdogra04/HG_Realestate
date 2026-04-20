// src/routes/brands.js
import express from 'express';
import { getBrands, createBrand, deleteBrand } from '../controllers/brandController.js';
import { protect } from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';

const router = express.Router();

router.get('/', getBrands);
router.post('/', protect, roleCheck('admin'), createBrand);
router.delete('/:id', protect, roleCheck('admin'), deleteBrand);

export default router;
