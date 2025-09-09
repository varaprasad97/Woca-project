const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/services/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Create a new service (provider only)
router.post('/', protect, upload.array('images', 5), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      price,
      priceRange,
      experience,
      qualifications,
      availability
    } = req.body;

    const images = req.files ? req.files.map(f => `/uploads/services/${f.filename}`) : [];

    const service = new Service({
      title,
      description,
      category,
      location,
      price,
      priceRange,
      createdBy: req.user._id,
      images,
      experience,
      qualifications,
      availability,
      status: 'pending'
    });
    await service.save();
    res.status(201).json({ message: 'Service submitted for approval', service });
  } catch (error) {
    console.error('Service creation error:', error);
    res.status(500).json({ message: 'Failed to create service' });
  }
});

// Get all approved services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ status: 'approved' }).populate('createdBy', 'name email');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
});

// Get provider's own services
router.get('/my', protect, async (req, res) => {
  try {
    const services = await Service.find({ createdBy: req.user._id });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your services' });
  }
});

// Get single service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('createdBy', 'name email phone');
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch service' });
  }
});

// Update service (provider can only edit their own services)
router.put('/:id', protect, upload.array('images', 5), async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Check if provider owns this service
    if (service.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own services' });
    }

    const {
      title,
      description,
      category,
      location,
      price,
      priceRange,
      experience,
      qualifications,
      availability
    } = req.body;

    // Handle new images
    const newImages = req.files ? req.files.map(f => `/uploads/services/${f.filename}`) : [];
    const existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
    const images = [...existingImages, ...newImages];

    service.title = title;
    service.description = description;
    service.category = category;
    service.location = location;
    service.price = price;
    service.priceRange = priceRange;
    service.images = images;
    service.experience = experience;
    service.qualifications = qualifications;
    service.availability = availability;
    service.status = 'pending'; // Reset to pending for re-approval

    await service.save();
    res.json({ message: 'Service updated successfully', service });
  } catch (error) {
    console.error('Service update error:', error);
    res.status(500).json({ message: 'Failed to update service' });
  }
});

// Delete service (provider can only delete their own services)
router.delete('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    // Check if provider owns this service
    if (service.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own services' });
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Service deletion error:', error);
    res.status(500).json({ message: 'Failed to delete service' });
  }
});

// Approve or reject a service (admin only, for now auto-approve)
router.put('/:id/approve', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    service.status = 'approved';
    await service.save();
    res.json({ message: 'Service approved', service });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve service' });
  }
});

module.exports = router;
