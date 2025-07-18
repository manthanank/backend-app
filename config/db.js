const mongoose = require('mongoose');
const logger = require('../logger');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    logger.error('MONGODB_URI environment variable is not defined');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    logger.info('Connected to MongoDB database!');
  } catch (error) {
    logger.error('Connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
