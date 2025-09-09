const express = require('express');
const Review = require('../models/Review');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Add Review
router.post('/', protect, async (req, res) => {
  const { service, rating, comment } = req.body;
  try {
    const review = await Review.create({
      user: req.user._id,
      service,
      rating,
      comment
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Reviews for a Service
router.get('/:serviceId', async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId }).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
