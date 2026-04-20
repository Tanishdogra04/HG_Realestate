// backend/src/scripts/seedAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { hashPassword } from '../utils/hash.js';

dotenv.config({ path: './.env' });
dotenv.config({ path: '../.env' });
dotenv.config({ path: '../../.env' });

const seedAdmin = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGO_URI is missing from environment');
    
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    const adminEmail = 'admin@admin.com';
    const adminPassword = 'admin123';
    const hashedPassword = await hashPassword(adminPassword);

    const result = await User.findOneAndUpdate(
      { email: adminEmail },
      { 
        name: 'Super Admin',
        password: hashedPassword,
        role: 'admin'
      },
      { upsert: true, new: true }
    );

    console.log('🚀 Admin account synchronized successfully!');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();
