const mongoose = require('mongoose');
const logger = require('../logger');
const { DATABASE } = require('./constants');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    logger.error('MONGODB_URI is not defined in environment variables');
    process.exit(1);
  }

  try {
    const options = {
      serverSelectionTimeoutMS: DATABASE.SERVER_SELECTION_TIMEOUT_MS,
      socketTimeoutMS: DATABASE.SOCKET_TIMEOUT_MS,
    };

    await mongoose.connect(mongoURI, options);
    logger.info('Connected to MongoDB database!');

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected successfully');
    });
  } catch (error) {
    logger.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
