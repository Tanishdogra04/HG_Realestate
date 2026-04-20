// src/models/Job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brandName: { type: String, required: true },
  brandLogo: { type: String },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  catId: { type: String },
  subCatId: { type: String },
  type: { type: String, enum: ['Full Time', 'Part Time', 'Contract'], default: 'Full Time' },
  location: { type: String, default: 'HG Eaton Plaza, Block A' },
  salary: { type: String },
  description: { type: String, required: true },
  longDescription: { type: String },
  postedDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema);
