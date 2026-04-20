// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/hash.js';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashed = await hashPassword(password);
    const userList = { name, email, password: hashed };
    if (role && ['tenant', 'user'].includes(role)) {
      userList.role = role;
    }
    const user = await User.create(userList);
    const token = generateToken(user._id);
    res.status(201).json({ token, user: { id: user._id, name, email, role: user.role, brandId: user.brandId } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, brandId: user.brandId } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
