// src/routes/enquiries.js
import { Router } from 'express';
import { createEnquiry, getEnquiries } from '../controllers/enquiryController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/', createEnquiry);
// Protected route for admins to see list of enquiries
router.get('/', protect, getEnquiries);

export default router;
