const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/database');
require('dotenv').config();
const path = require('path');

const app = express();
const server = http.createServer(app); // wrap express with http
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/service'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/reviews', require('./routes/review'));
app.use('/api/chat', require('./routes/chat')); // <-- chat route (we'll create it next)

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Socket.IO events
io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id);

  socket.on('joinRoom', ({ senderId, receiverId }) => {
    const roomId = [senderId, receiverId].sort().join('-');
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  socket.on('sendMessage', ({ senderId, receiverId, message }) => {
    const roomId = [senderId, receiverId].sort().join('-');
    io.to(roomId).emit('receiveMessage', {
      senderId,
      receiverId,
      message,
      createdAt: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected');
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
