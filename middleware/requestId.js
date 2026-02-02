const crypto = require('crypto');

/**
 * Request ID middleware
 * Adds a unique ID to each request for tracking and logging
 */
const requestId = (req, res, next) => {
  // Check if request ID already exists in header (from client or load balancer)
  const existingId = req.headers['x-request-id'];

  // Generate new ID if not present
  const id = existingId || crypto.randomUUID();

  // Attach to request object
  req.id = id;

  // Send back in response header
  res.setHeader('X-Request-ID', id);

  next();
};

module.exports = requestId;
