const rateLimit = require('express-rate-limit');
const { RATE_LIMIT } = require('../config/constants');

/**
 * Global rate limiter for all API endpoints
 */
const globalLimiter = rateLimit({
  windowMs: RATE_LIMIT.WINDOW_MS,
  max: RATE_LIMIT.MAX_REQUESTS,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  identifier: 'global',
});

/**
 * Strict rate limiter for OTP endpoints
 * Prevents abuse of OTP generation
 */
const otpLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // 3 requests per minute per IP
  message: {
    success: false,
    error: 'Too many OTP requests. Please wait before trying again.',
  },
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  identifier: 'otp',
  skipSuccessfulRequests: false,
});

/**
 * Rate limiter for authentication/login endpoints
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per 15 minutes
  message: {
    success: false,
    error: 'Too many authentication attempts. Please try again later.',
  },
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  identifier: 'auth',
});

/**
 * Rate limiter for sensitive operations
 * (delete, update sensitive data, etc.)
 */
const sensitiveLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: {
    success: false,
    error: 'Too many requests for this operation. Please slow down.',
  },
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  identifier: 'sensitive',
});

module.exports = {
  globalLimiter,
  otpLimiter,
  authLimiter,
  sensitiveLimiter,
};
