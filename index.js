require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const logger = require('./logger');
const otpRoutes = require('./routes/otp');
const connectDB = require('./config/db');
const validateEnv = require('./config/validateEnv');
const morgan = require('morgan');
const compression = require('compression');
const errorHandler = require('./middleware/errorHandler');
const requestId = require('./middleware/requestId');
const { globalLimiter } = require('./middleware/rateLimiters');
const {
  healthCheck,
  readinessCheck,
  livenessCheck,
} = require('./controllers/healthController');
const {
  performanceMonitor,
  trackMetrics,
  getMetrics,
} = require('./middleware/performanceMonitor');
const deprecationWarning = require('./middleware/deprecationWarning');
const mongoose = require('mongoose');
const emailService = require('./services/emailService');

// Validate environment variables before starting
try {
  validateEnv();
} catch (error) {
  logger.error('Environment validation failed:', error.message);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// trust proxy - required for express-rate-limit if behind a proxy (like Vercel)
app.set('trust proxy', 1);

// Database connection
connectDB();

// Initialize email service
emailService.initialize();
// Verify email configuration (non-blocking)
emailService.verifyConfiguration().catch(() => {
  logger.warn(
    'Email service configuration could not be verified. Email features may not work.',
  );
});

// Middleware
// Request ID tracking (must be first)
app.use(requestId);

// Performance monitoring
app.use(performanceMonitor);
app.use(trackMetrics);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          'cdnjs.cloudflare.com',
        ],
        styleSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
        imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
        connectSrc: ["'self'", 'https:'],
      },
    },
  }),
);
// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:3000',
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);
app.use(express.static('public'));
app.use(express.json());
// Custom morgan format with request ID
morgan.token('request-id', (req) => req.id);
app.use(morgan(':method :url :status :response-time ms - :request-id'));
app.use(compression());

// Global Rate Limiting
app.use(globalLimiter);

// API Version 1 Routes (Recommended)
app.use('/api/v1', require('./routes/v1'));

// Legacy routes (for backward compatibility - deprecated)
// These will be removed in v2
const legacyDeprecation = deprecationWarning('v1', '2027-01-01');
app.use('/api/states', legacyDeprecation, require('./routes/states'));
app.use('/api/districts', legacyDeprecation, require('./routes/districts'));
app.use('/api/simpleapis', legacyDeprecation, require('./routes/simpleapis'));
app.use('/api/ossinsight', legacyDeprecation, require('./routes/ossinsight'));
app.use('/api/subscribe', legacyDeprecation, require('./routes/subscribers'));
app.use('/api/unsubscribe', legacyDeprecation, require('./routes/subscribers'));
app.use('/api/subscribers', legacyDeprecation, require('./routes/subscribers'));
app.use('/api/items', legacyDeprecation, require('./routes/items'));
app.use('/api/books', legacyDeprecation, require('./routes/books'));
app.use('/api/notes', legacyDeprecation, require('./routes/notes'));
app.use('/api/sendOTP', legacyDeprecation, otpRoutes);
app.use('/api/verifyOTP', legacyDeprecation, otpRoutes);
app.use('/api/locations', legacyDeprecation, require('./routes/locations'));
app.use('/api/jokes', legacyDeprecation, require('./routes/jokes'));
app.use('/api/uses', legacyDeprecation, require('./routes/uses'));

// API version info endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Backend App API',
    version: 'v1',
    latestVersion: 'v1',
    availableVersions: ['v1'],
    deprecation: {
      unversionedRoutes: {
        status: 'deprecated',
        message:
          'Unversioned routes (/api/*) are deprecated. Please use /api/v1/* instead.',
        sunsetDate: '2027-01-01',
      },
    },
    endpoints: {
      v1: '/api/v1',
      docs: '/api/docs',
      health: '/health',
      metrics: '/metrics',
    },
  });
});

// Swagger setup
require('./swagger')(app);

// Serve static files in production (SPA fallback)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// Health check endpoints (before error handler)
app.get('/health', healthCheck);
app.get('/readiness', readinessCheck);
app.get('/liveness', livenessCheck);

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.json({
    ...getMetrics(),
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  const domain =
    process.env.DOMAIN ||
    (process.env.NODE_ENV === 'production'
      ? 'backend-app-manthanank.vercel.app'
      : `localhost:${PORT}`);
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  logger.info(`Visit ${protocol}://${domain}/health for health check`);
  logger.info(`Visit ${protocol}://${domain}/readiness for readiness check`);
  logger.info(`Visit ${protocol}://${domain}/api/docs for API documentation`);
});

// Graceful shutdown handlers
const gracefulShutdown = async (signal) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);

  // Stop accepting new connections
  server.close(async () => {
    logger.info('HTTP server closed');

    try {
      // Close database connection
      await mongoose.connection.close(false);
      logger.info('MongoDB connection closed');

      logger.info('Graceful shutdown completed');
      process.exit(0);
    } catch (error) {
      logger.error('Error during graceful shutdown:', error);
      process.exit(1);
    }
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    logger.error('Forced shutdown due to timeout');
    process.exit(1);
  }, 30000);
};

// Handle termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});
