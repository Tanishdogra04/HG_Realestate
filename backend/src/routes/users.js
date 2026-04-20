// src/routes/users.js
import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);

export default router;
