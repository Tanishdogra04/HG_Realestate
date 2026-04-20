// src/models/Brand.js
import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  logo: { type: String },
  sidebarLogo: { type: String },
  color: { type: String, default: 'bg-white text-gray-800 border' },
  views: { type: Number, default: 0 },
  categoryId: { type: String }, 
  subCategoryId: { type: String },
  location: { type: String },
  categories: [{ type: String }],
  description: { type: String },
  contact: { type: String },
  address: { type: String },
  timings: [{
    day: { type: String },
    time: { type: String }
  }],
  rating: { type: Number, default: 4.5 },
  website: { type: String }
}, { timestamps: true });

export default mongoose.model('Brand', brandSchema);
