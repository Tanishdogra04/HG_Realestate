// src/routes/jobs.js
import express from 'express';
import { getJobs, createJob, deleteJob } from '../controllers/jobController.js';
import { protect } from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';

const router = express.Router();

router.get('/', getJobs);
router.post('/', protect, roleCheck('admin'), createJob);
router.delete('/:id', protect, roleCheck('admin'), deleteJob);

export default router;
