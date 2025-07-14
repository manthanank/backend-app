require('dotenv').config();
// Validate required environment variables before proceeding
require('./config/validateEnv')();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const logger = require('./logger');
const otpRoutes = require('./routes/otp');
const connectDB = require('./config/db');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
connectDB();

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "validator.swagger.io"],
      connectSrc: ["'self'", "https:"],
    },
  },
}));
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('combined'));
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api', require('./routes/states'));
app.use('/api', require('./routes/districts'));
app.use('/api', require('./routes/simpleapis'));
app.use('/api', require('./routes/ossinsight'));
app.use('/api', require('./routes/contacts'));
app.use('/api', require('./routes/subscribers'));
app.use('/api', require('./routes/items'));
app.use('/api', require('./routes/books'));
app.use('/api', require('./routes/notes'));
app.use('/api', otpRoutes);
app.use('/api/locations', require('./routes/locations'));
app.use('/api/jokes', require('./routes/jokes'));

app.use('/api/uses', require('./routes/uses'));

// Global error handler should be registered after all route declarations
app.use(errorHandler);

// Swagger setup
require('./swagger')(app);

// Serve static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// Refactored health check endpoint
app.get('/health', (req, res) => {
  // Check database connection
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  const healthInfo = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: dbStatus,
    memory: {
      usage: process.memoryUsage().heapUsed / 1024 / 1024,
      total: process.memoryUsage().heapTotal / 1024 / 1024,
      unit: 'MB',
    },
  };

  res.status(200).json(healthInfo);
});

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  const domain = process.env.NODE_ENV === 'production' 
    ? 'backend-app-manthanank.vercel.app' 
    : `localhost:${PORT}`;
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  logger.info(`Visit ${protocol}://${domain}/health for health check`);
  logger.info(`Visit ${protocol}://${domain}/api/docs for API documentation`);
});
