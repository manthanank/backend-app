const logger = require('../logger');

/**
 * Deprecation warning middleware
 * Warns about deprecated API endpoints
 */
const deprecationWarning = (version, sunsetDate) => {
  return (req, res, next) => {
    // Add deprecation headers
    res.setHeader('X-API-Deprecated', 'true');
    res.setHeader('X-API-Sunset-Date', sunsetDate);
    res.setHeader(
      'X-API-Deprecation-Info',
      `This endpoint is deprecated. Please use /api/${version}${req.path} instead.`,
    );

    // Log deprecation usage
    logger.warn('Deprecated API endpoint accessed', {
      requestId: req.id,
      method: req.method,
      url: req.originalUrl,
      userAgent: req.get('user-agent'),
      ip: req.ip,
      recommendedUrl: `/api/${version}${req.path}`,
    });

    next();
  };
};

module.exports = deprecationWarning;
