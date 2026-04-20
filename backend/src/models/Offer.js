// src/models/Offer.js
import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brandName: { type: String, required: true },
  brandLogo: { type: String },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  discount: { type: String, required: true }, // e.g. "50% OFF"
  expiryDate: { type: String },
  category: { type: String },
  description: { type: String },
  terms: { type: String },
  image: { type: String }
}, { timestamps: true });

export default mongoose.model('Offer', offerSchema);
