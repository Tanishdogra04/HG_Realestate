// src/routes/categories.js
import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', getCategories);
// For now allow only admins to create; placeholder protect middleware
router.post('/', protect, createCategory);

export default router;
