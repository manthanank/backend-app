require('dotenv').config();
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

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
connectDB();

// Middleware
app.use(helmet());
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
app.use(errorHandler);

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

// Swagger setup
require('./swagger')(app);

// Error handling
app.use((err, req, res) => {
  logger.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Serve static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
