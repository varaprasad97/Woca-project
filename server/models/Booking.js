const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  serviceDetails: {
    title: String,
    category: String,
    price: Number,
    location: String
  },
  bookingDetails: {
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    specialInstructions: String
  },
  payment: {
    method: {
      type: String,
      enum: ['UPI', 'Card', 'Net Banking', 'Wallet', 'COD'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    platformFee: Number,
    gst: Number,
    totalAmount: Number,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  notifications: {
    providerNotified: {
      type: Boolean,
      default: false
    },
    customerNotified: {
      type: Boolean,
      default: false
    },
    notificationSentAt: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
