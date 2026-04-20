import Brand from '../models/Brand.js';
import User from '../models/User.js';

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ name: 1 });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    
    // Auto-link if tenant
    if (req.user && req.user.role === 'tenant') {
      await User.findByIdAndUpdate(req.user.id, { brandId: brand._id });
    }
    
    res.status(201).json(brand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.json({ message: 'Brand removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
