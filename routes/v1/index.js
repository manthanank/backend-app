const express = require('express');
const router = express.Router();

/**
 * API Version 1 Routes
 * All v1 endpoints are mounted here
 */

// Import route modules
const statesRoutes = require('../states');
const districtsRoutes = require('../districts');
const simpleapisRoutes = require('../simpleapis');
const ossinsightRoutes = require('../ossinsight');
const subscribersRoutes = require('../subscribers');
const itemsRoutes = require('../items');
const booksRoutes = require('../books');
const notesRoutes = require('../notes');
const otpRoutes = require('../otp');
const locationsRoutes = require('../locations');
const jokesRoutes = require('../jokes');
const usesRoutes = require('../uses');

// Mount routes
router.use('/states', statesRoutes);
router.use('/districts', districtsRoutes);
router.use('/simpleapis', simpleapisRoutes);
router.use('/ossinsight', ossinsightRoutes);
router.use('/subscribers', subscribersRoutes);
router.use('/subscribe', subscribersRoutes); // Keep backward compatibility
router.use('/unsubscribe', subscribersRoutes);
router.use('/items', itemsRoutes);
router.use('/books', booksRoutes);
router.use('/notes', notesRoutes);
router.use('/otp', otpRoutes);
router.use('/sendOTP', otpRoutes); // Keep backward compatibility
router.use('/verifyOTP', otpRoutes);
router.use('/locations', locationsRoutes);
router.use('/jokes', jokesRoutes);
router.use('/uses', usesRoutes);

// API version info endpoint
router.get('/', (req, res) => {
  res.json({
    version: 'v1',
    status: 'stable',
    message: 'API Version 1 - Stable',
    documentation: '/api/docs',
    endpoints: {
      health: '/health',
      metrics: '/metrics',
      states: '/api/v1/states',
      districts: '/api/v1/districts',
      subscribers: '/api/v1/subscribers',
      books: '/api/v1/books',
      items: '/api/v1/items',
      notes: '/api/v1/notes',
      otp: '/api/v1/sendOTP & /api/v1/verifyOTP',
      locations: '/api/v1/locations',
      jokes: '/api/v1/jokes',
      uses: '/api/v1/uses',
    },
  });
});

module.exports = router;
