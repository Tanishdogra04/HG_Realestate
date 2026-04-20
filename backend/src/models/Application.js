// src/models/Application.js
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  experience: { type: Number, required: true },
  message: { type: String },
  status: { type: String, enum: ['Pending', 'Reviewed', 'Rejected', 'Hired'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Application', applicationSchema);
