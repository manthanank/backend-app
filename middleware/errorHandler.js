const logger = require('../logger');

/**
 * Global error handler middleware
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  logger.error(`${err.name}: ${err.message}`);
  logger.error(err.stack);

  const errorResponse = {
    status: 'error',
    message: err.message || 'Internal server error',
    statusCode: err.statusCode || 500,
  };

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    errorResponse.statusCode = 400;
    errorResponse.message = 'Validation failed';
    errorResponse.errors = Object.values(err.errors).map(val => ({
      field: val.path,
      message: val.message
    }));
    return res.status(400).json(errorResponse);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    errorResponse.statusCode = 400;
    errorResponse.message = `Invalid ${err.path}: ${err.value}`;
    return res.status(400).json(errorResponse);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    errorResponse.statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    errorResponse.message = `Duplicate value for field: ${field}`;
    return res.status(409).json(errorResponse);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    errorResponse.statusCode = 401;
    errorResponse.message = 'Invalid token';
    return res.status(401).json(errorResponse);
  }

  if (err.name === 'TokenExpiredError') {
    errorResponse.statusCode = 401;
    errorResponse.message = 'Token expired';
    return res.status(401).json(errorResponse);
  }

  // Custom error handling
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(err.errors && { errors: err.errors })
    });
  }

  // Pass to next error handler if headers already sent
  if (res.headersSent) {
    return next(err);
  }

  // Generic server error
  res.status(errorResponse.statusCode).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong'
      : errorResponse.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.exports = errorHandler;

module.exports = errorHandler;
