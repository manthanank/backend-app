/**
 * Application Constants
 * Centralized configuration for magic numbers and constants
 */

module.exports = {
  // API Versioning
  API: {
    CURRENT_VERSION: 'v1',
    SUPPORTED_VERSIONS: ['v1'],
    DEPRECATED_VERSIONS: [],
    SUNSET_DATE: '2027-01-01',
  },
  // OTP Configuration
  OTP: {
    LENGTH: 6,
    EXPIRY_MINUTES: 10,
    RATE_LIMIT_SECONDS: 60, // Minimum time between OTP requests
  },

  // Pagination Configuration
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },

  // Rate Limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100, // Max requests per window
  },

  // Time Constants (in milliseconds)
  TIME: {
    ONE_SECOND: 1000,
    ONE_MINUTE: 60 * 1000,
    ONE_HOUR: 60 * 60 * 1000,
    ONE_DAY: 24 * 60 * 60 * 1000,
  },

  // Database Configuration
  DATABASE: {
    SERVER_SELECTION_TIMEOUT_MS: 5000,
    SOCKET_TIMEOUT_MS: 45000,
  },

  // Email Configuration
  EMAIL: {
    OTP_SUBJECT: 'Your OTP',
    NEWSLETTER_WELCOME_SUBJECT: 'Welcome to Our Newsletter!',
  },

  // HTTP Status Codes (commonly used)
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
  },
};
