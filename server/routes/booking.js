const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const User = require('../models/user');
const Service = require('../models/Service');
const { protect } = require('../middleware/authMiddleware');

// Create a new booking
router.post('/', protect, async (req, res) => {
  try {
    const {
      serviceId,
      providerId,
      bookingDetails,
      payment
    } = req.body;

    // Get service details
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Get provider details
    const provider = await User.findById(providerId);
    if (!provider || provider.role !== 'provider') {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Create booking
    const booking = new Booking({
      customer: req.user._id,
      provider: providerId,
      service: serviceId,
      serviceDetails: {
        title: service.title,
        category: service.category,
        price: service.price,
        location: service.location
      },
      bookingDetails,
      payment,
      notifications: {
        providerNotified: false,
        customerNotified: true,
        notificationSentAt: new Date()
      }
    });

    await booking.save();

    // Send notification to provider (simulated)
    console.log(`🔔 Notification sent to provider ${provider.name} for booking ${booking._id}`);

    res.status(201).json({
      message: 'Booking created successfully',
      booking: {
        _id: booking._id,
        status: booking.status,
        serviceDetails: booking.serviceDetails,
        bookingDetails: booking.bookingDetails,
        payment: booking.payment,
        createdAt: booking.createdAt
      }
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
});

// Get customer's bookings
router.get('/customer', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .populate('provider', 'name email phone')
      .populate('service', 'title category')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Get customer bookings error:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// Get provider's bookings
router.get('/provider', protect, async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ message: 'Access denied. Provider only.' });
    }

    const bookings = await Booking.find({ provider: req.user._id })
      .populate('customer', 'name email phone address')
      .populate('service', 'title category')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Get provider bookings error:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// Update booking status (provider only)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only provider can update status
    if (booking.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    booking.status = status;
    booking.notifications.customerNotified = false; // Reset for new notification
    await booking.save();

    // Send notification to customer (simulated)
    console.log(`🔔 Status update notification sent to customer for booking ${booking._id}`);

    res.json({
      message: 'Booking status updated successfully',
      booking
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({ message: 'Failed to update booking status' });
  }
});

// Get booking details
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('customer', 'name email phone address')
      .populate('provider', 'name email phone address')
      .populate('service', 'title category description');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user has access to this booking
    if (booking.customer._id.toString() !== req.user._id.toString() && 
        booking.provider._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking details error:', error);
    res.status(500).json({ message: 'Failed to fetch booking details' });
  }
});

// Mark notification as read
router.put('/:id/notifications', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.user.role === 'provider' && booking.provider.toString() === req.user._id.toString()) {
      booking.notifications.providerNotified = true;
    } else if (req.user.role === 'customer' && booking.customer.toString() === req.user._id.toString()) {
      booking.notifications.customerNotified = true;
    }

    await booking.save();
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({ message: 'Failed to update notification' });
  }
});

module.exports = router;
