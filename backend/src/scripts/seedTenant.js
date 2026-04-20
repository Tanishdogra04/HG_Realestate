// src/scripts/seedTenant.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Brand from '../models/Brand.js';
import { hashPassword } from '../utils/hash.js';

dotenv.config();

const seedTenant = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find Zudio Brand
    const zudio = await Brand.findOne({ name: 'ZUDIO' });
    if (!zudio) {
      console.log('❌ ZUDIO brand not found. Please run seedElite.js first.');
      process.exit(1);
    }

    // Check if tenant already exists
    const existing = await User.findOne({ email: 'zudio@admin.com' });
    if (existing) {
      console.log('⚠️ Zudio tenant already exists');
      process.exit(0);
    }

    const hashed = await hashPassword('admin123');
    await User.create({
      name: 'Zudio Manager',
      email: 'zudio@admin.com',
      password: hashed,
      role: 'tenant',
      brandId: zudio._id
    });

    console.log('🏢 Zudio Tenant Account Created: zudio@admin.com / admin123');

  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedTenant();
