// src/config/db.js
import mongoose from 'mongoose';
import config from './index.js';

const connectDB = async () => {
  if (!config.MONGODB_URI) {
    console.error('❌ MongoDB URI is missing! Please check your environment variables.');
    process.exit(1);
  }
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

export default connectDB;
