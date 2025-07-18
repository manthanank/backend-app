const mongoose = require('mongoose');
const logger = require('../logger');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    logger.error('MONGODB_URI is not defined in environment variables');
    logger.warn('Running without database connection. Some features may not work.');
    return;
  }

  try {
    await mongoose.connect(mongoURI);
    logger.info('Connected to MongoDB database!');
  } catch (error) {
    logger.error('Connection failed:', error.message);
    logger.warn('Running without database connection. Some features may not work.');
    // Don't exit the process, allow the app to run without DB
    // process.exit(1);
  }
};

module.exports = connectDB;
