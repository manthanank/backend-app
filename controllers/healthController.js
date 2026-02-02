const mongoose = require('mongoose');
const emailService = require('../services/emailService');
const { version } = require('../package.json');

/**
 * Enhanced health check endpoint
 * Provides comprehensive system status
 */
exports.healthCheck = async (req, res) => {
  const startTime = Date.now();

  try {
    // Check database connection
    const dbStatus =
      mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    let dbResponseTime = null;

    if (dbStatus === 'connected') {
      const dbStart = Date.now();
      try {
        await mongoose.connection.db.admin().ping();
        dbResponseTime = Date.now() - dbStart;
      } catch {
        dbResponseTime = null;
      }
    }

    // Check email service
    const emailStatus = emailService.initialized
      ? 'initialized'
      : 'not_initialized';

    // Memory usage
    const memoryUsage = process.memoryUsage();

    // CPU usage
    const cpuUsage = process.cpuUsage();

    const healthInfo = {
      status: 'ok',
      version,
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      environment: process.env.NODE_ENV || 'development',

      database: {
        status: dbStatus,
        responseTime: dbResponseTime ? `${dbResponseTime}ms` : 'N/A',
      },

      services: {
        email: emailStatus,
      },

      memory: {
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        rss: Math.round(memoryUsage.rss / 1024 / 1024),
        external: Math.round(memoryUsage.external / 1024 / 1024),
        unit: 'MB',
      },

      cpu: {
        user: Math.round(cpuUsage.user / 1000),
        system: Math.round(cpuUsage.system / 1000),
        unit: 'microseconds',
      },

      responseTime: `${Date.now() - startTime}ms`,
    };

    // Determine HTTP status based on critical services
    const httpStatus = dbStatus === 'connected' ? 200 : 503;

    res.status(httpStatus).json(healthInfo);
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Simple readiness check
 * Used by load balancers and orchestrators
 */
exports.readinessCheck = (req, res) => {
  const isReady = mongoose.connection.readyState === 1;

  if (isReady) {
    res.status(200).json({ status: 'ready' });
  } else {
    res.status(503).json({ status: 'not_ready' });
  }
};

/**
 * Simple liveness check
 * Used by load balancers and orchestrators
 */
exports.livenessCheck = (req, res) => {
  res.status(200).json({ status: 'alive' });
};
