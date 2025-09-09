const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // You can replace this with your actual MongoDB URI
    // For local development: mongodb://localhost:27017/woca
    // For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/woca
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/woca';
    
    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB; 