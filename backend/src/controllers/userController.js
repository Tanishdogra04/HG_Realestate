// src/controllers/userController.js
import User from '../models/User.js';

// Get current user profile (protected)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update current user profile (protected)
export const updateProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    // Prevent password change via this endpoint
    delete updates.password;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
