// src/controllers/enquiryController.js
import Enquiry from '../models/Enquiry.js';

// Submit a new enquiry
export const createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json(enquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all enquiries (protected, admin only)
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().populate('property', 'title');
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
