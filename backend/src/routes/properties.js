// src/routes/properties.js
import { Router } from 'express';
import {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty
} from '../controllers/propertyController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Public read routes
router.get('/', getProperties);
router.get('/:id', getProperty);

// Protected write routes
router.post('/', protect, createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

export default router;
