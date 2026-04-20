// src/routes/applications.js
import express from 'express';
import { getApplications, createApplication, updateApplicationStatus } from '../controllers/applicationController.js';
import { protect } from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';

const router = express.Router();

router.post('/', createApplication); // Public submission
router.get('/', protect, roleCheck('admin'), getApplications);
router.patch('/:id/status', protect, roleCheck('admin'), updateApplicationStatus);

export default router;
