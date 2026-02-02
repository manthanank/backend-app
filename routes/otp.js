const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const { sendOTP, verifyOTP } = require('../controllers/otpController');
const { otpLimiter } = require('../middleware/rateLimiters');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: errors.array(),
    });
  }
  next();
};

// Validation rules for sendOTP with sanitization
const sendOTPValidation = [
  query('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
    .escape(), // Escape HTML characters
  validate,
];

// Validation rules for verifyOTP with sanitization
const verifyOTPValidation = [
  query('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail()
    .escape(), // Escape HTML characters
  query('otp')
    .trim()
    .notEmpty()
    .withMessage('OTP is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits')
    .isNumeric()
    .withMessage('OTP must be numeric')
    .escape(), // Escape HTML characters
  validate,
];

/**
 * @swagger
 * tags:
 *   name: OTP
 *   description: OTP management
 */

/**
 * @swagger
 * /api/sendOTP:
 *   get:
 *     summary: Send OTP to the provided email
 *     tags: [OTP]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email to send the OTP to
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
router.get('/sendOTP', otpLimiter, sendOTPValidation, sendOTP);

/**
 * @swagger
 * /api/verifyOTP:
 *   get:
 *     summary: Verify the provided OTP
 *     tags: [OTP]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email associated with the OTP
 *       - in: query
 *         name: otp
 *         schema:
 *           type: string
 *         required: true
 *         description: The OTP to verify
 *     responses:
 *       200:
 *         description: OTP verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
router.get('/verifyOTP', otpLimiter, verifyOTPValidation, verifyOTP);

module.exports = router;
