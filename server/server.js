require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const connectDB = require('./config/database');

const app = express();
const server = http.createServer(app);

// =====================
// Middleware
// =====================
app.use(cors({
  origin: '*', // later replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// Routes
// =====================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/service'));
app.use('/api/bookings', require('./routes/booking'));
app.use('/api/reviews', require('./routes/review'));
app.use('/api/chat', require('./routes/chat'));

// =====================
// Static files
// =====================
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// =====================
// Socket.IO setup
// =====================
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  socket.on('joinRoom', ({ senderId, receiverId }) => {
    const roomId = [senderId, receiverId].sort().join('-');
    socket.join(roomId);
    console.log(`👥 Joined room: ${roomId}`);
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
    console.log('❌ Client disconnected:', socket.id);
  });
});

// =====================
// Start Server AFTER MongoDB connects
// =====================
const PORT = process.env.PORT || 5005;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

