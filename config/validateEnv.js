const logger = require('../logger');

/**
 * Validate required environment variables
 * @throws {Error} if required variables are missing
 */
const validateEnv = () => {
  const required = {
    // Server Configuration
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,

    // Database Configuration
    MONGODB_URI: process.env.MONGODB_URI,
  };

  const optional = {
    // Optional but recommended
    DOMAIN: process.env.DOMAIN,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,

    // Email Configuration (optional - app works without it)
    SMPT_HOST: process.env.SMPT_HOST,
    SMPT_PORT: process.env.SMPT_PORT,
    SMPT_MAIL: process.env.SMPT_MAIL,
    SMPT_APP_PASS: process.env.SMPT_APP_PASS,

    // Notion API (optional)
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  };

  // Check required variables
  const missing = Object.keys(required).filter((key) => !required[key]);

  if (missing.length > 0) {
    const errorMessage = `Missing required environment variables: ${missing.join(', ')}`;
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  // Warn about missing optional variables
  const missingOptional = Object.keys(optional).filter((key) => !optional[key]);
  if (missingOptional.length > 0) {
    logger.warn(
      `Missing optional environment variables: ${missingOptional.join(', ')}`,
    );
    logger.warn('Some features may not work without these variables.');
  }

  // Validate PORT is a number
  const port = parseInt(process.env.PORT, 10);
  if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid number between 1 and 65535');
  }

  // Validate NODE_ENV
  const validEnvs = ['development', 'production', 'test'];
  if (!validEnvs.includes(process.env.NODE_ENV)) {
    logger.warn(
      `NODE_ENV should be one of: ${validEnvs.join(', ')}. Current: ${process.env.NODE_ENV}`,
    );
  }

  // Validate MongoDB URI format
  if (
    process.env.MONGODB_URI &&
    !process.env.MONGODB_URI.startsWith('mongodb')
  ) {
    throw new Error(
      'MONGODB_URI must start with "mongodb://" or "mongodb+srv://"',
    );
  }

  // Validate email configuration if provided
  if (process.env.SMPT_HOST && process.env.SMPT_PORT) {
    const smtpPort = parseInt(process.env.SMPT_PORT, 10);
    if (isNaN(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
      throw new Error('SMPT_PORT must be a valid number between 1 and 65535');
    }
  }

  logger.info('Environment variables validated successfully');
  return true;
};

module.exports = validateEnv;
