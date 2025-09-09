# MongoDB Setup Guide

## Prerequisites
1. Make sure MongoDB is installed on your system
2. Or use MongoDB Atlas (cloud service)

## Local MongoDB Setup

### Option 1: Local MongoDB Installation
1. Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Create a database named 'woca'

### Option 2: MongoDB Atlas (Cloud)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# MongoDB Connection
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/woca

# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/woca

# JWT Secret (generate a strong secret key)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

## Installation Steps

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the `.env` file with your MongoDB URI

4. Start the server:
   ```bash
   node server.js
   ```

## Troubleshooting

### Common Issues:

1. **MongoDB not running**: Make sure MongoDB service is started
2. **Connection refused**: Check if MongoDB is running on the correct port (default: 27017)
3. **Authentication failed**: Check your MongoDB Atlas credentials
4. **Network error**: Check your internet connection for Atlas

### Test Connection:
The server will log "MongoDB Connected" when successfully connected. 