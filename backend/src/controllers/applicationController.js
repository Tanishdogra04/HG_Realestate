// src/controllers/applicationController.js
import Application from '../models/Application.js';

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('job', 'title brandName')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createApplication = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(application);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
