const express = require('express');
const Message = require('../models/Message');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all messages between two users
router.get('/:userId', protect, async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user._id;

  try {
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save a new message (optional REST fallback)
router.post('/', protect, async (req, res) => {
  const { receiverId, message } = req.body;

  try {
    const newMessage = await Message.create({
      senderId: req.user._id,
      receiverId,
      message
    });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
