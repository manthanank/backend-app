const logger = require('../logger');

/**
 * Performance monitoring middleware
 * Tracks request duration and logs slow requests
 */
const performanceMonitor = (req, res, next) => {
  const start = Date.now();

  // Store start time on request
  req.startTime = start;

  // Listen for response finish event
  res.on('finish', () => {
    const duration = Date.now() - start;

    // Log slow requests (> 1 second)
    if (duration > 1000) {
      logger.warn('Slow request detected', {
        requestId: req.id,
        method: req.method,
        url: req.originalUrl || req.url,
        duration: `${duration}ms`,
        statusCode: res.statusCode,
        userAgent: req.get('user-agent'),
      });
    }

    // Log all HTTP requests with timing
    logger.http('Request completed', {
      requestId: req.id,
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      contentLength: res.get('content-length') || 0,
    });
  });

  next();
};

/**
 * Get performance metrics for a specific time window
 */
const metrics = {
  requests: 0,
  errors: 0,
  totalDuration: 0,
  slowRequests: 0,
};

const trackMetrics = (req, res, next) => {
  metrics.requests++;

  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    metrics.totalDuration += duration;

    if (duration > 1000) {
      metrics.slowRequests++;
    }

    if (res.statusCode >= 500) {
      metrics.errors++;
    }
  });

  next();
};

const getMetrics = () => {
  return {
    ...metrics,
    averageResponseTime:
      metrics.requests > 0
        ? Math.round(metrics.totalDuration / metrics.requests)
        : 0,
    errorRate:
      metrics.requests > 0
        ? ((metrics.errors / metrics.requests) * 100).toFixed(2) + '%'
        : '0%',
    slowRequestRate:
      metrics.requests > 0
        ? ((metrics.slowRequests / metrics.requests) * 100).toFixed(2) + '%'
        : '0%',
  };
};

const resetMetrics = () => {
  metrics.requests = 0;
  metrics.errors = 0;
  metrics.totalDuration = 0;
  metrics.slowRequests = 0;
};

module.exports = {
  performanceMonitor,
  trackMetrics,
  getMetrics,
  resetMetrics,
};
