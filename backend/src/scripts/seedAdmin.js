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

    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('ℹ️ Admin user already exists');
      console.log('📧 Email:', adminEmail);
      console.log('🔑 Password:', adminPassword);
    } else {
      const hashedPassword = await hashPassword(adminPassword);
      await User.create({
        name: 'Super Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('🚀 Simple Admin user created successfully!');
      console.log('📧 Email:', adminEmail);
      console.log('🔑 Password:', adminPassword);
    }
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedAdmin();
