const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const errorResponse = {
    success: false,
    message: 'Internal server error',
    statusCode: err.statusCode || 500,
  };

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    errorResponse.statusCode = 400;
    errorResponse.message = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json(errorResponse);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    errorResponse.statusCode = 400;
    errorResponse.message = 'Invalid ID format';
    return res.status(400).json(errorResponse);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    errorResponse.statusCode = 409;
    errorResponse.message = 'Duplicate field value entered';
    return res.status(409).json(errorResponse);
  }

  // Custom error handling
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Pass to next error handler if headers already sent
  if (res.headersSent) {
    return next(err);
  }

  res.status(errorResponse.statusCode).json(errorResponse);
};

module.exports = errorHandler;
