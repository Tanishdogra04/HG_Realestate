// src/controllers/propertyController.js
import Property from '../models/Property.js';
import Category from '../models/Category.js';

// Create a new property
export const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    const populatedProperty = await Property.findById(property._id).populate('category', 'name slug');
    res.status(201).json(populatedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all properties (with optional filters)
export const getProperties = async (req, res) => {
  const { category, location } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (location) filter.location = { $regex: location, $options: 'i' };
  try {
    const properties = await Property.find(filter).populate('category', 'name slug');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single property by ID
export const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('category', 'name slug');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('category', 'name slug');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
