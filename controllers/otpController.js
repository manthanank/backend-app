const Otps = require('../models/otp.js');
const randomstring = require('randomstring');
const emailService = require('../services/emailService.js');
const logger = require('../logger');
const { OTP, HTTP_STATUS, TIME } = require('../config/constants');

// Generate OTP
function generateOTP() {
  return randomstring.generate({
    length: OTP.LENGTH,
    charset: 'numeric',
  });
}

// Send OTP to the provided email
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: 'Email is required',
      });
    }

    // Clean up any expired OTPs for this email first
    await Otps.deleteMany({
      email: email.toLowerCase().trim(),
      expiresAt: { $lt: new Date() },
    });

    // Check if there's a recent OTP (rate limiting)
    const recentOTP = await Otps.findOne({
      email: email.toLowerCase().trim(),
      createdAt: {
        $gte: new Date(Date.now() - OTP.RATE_LIMIT_SECONDS * TIME.ONE_SECOND),
      },
    });

    if (recentOTP) {
      return res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
        success: false,
        error: 'Please wait before requesting another OTP',
      });
    }

    const otp = generateOTP();
    const expiresAt = new Date(
      Date.now() + OTP.EXPIRY_MINUTES * TIME.ONE_MINUTE,
    );

    const newOTP = new Otps({
      email: email.toLowerCase().trim(),
      otp,
      expiresAt,
    });
    await newOTP.save();

    // Send OTP via email
    await emailService.sendOTP(email, otp);

    logger.info(`OTP sent to ${email}`);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    logger.error('Error sending OTP:', error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal server error' });
  }
};

// Verify OTP provided by the user
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.query;

    if (!email || !otp) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: 'Email and OTP are required',
      });
    }

    // Find and verify OTP
    const existingOTP = await Otps.findOne({
      email: email.toLowerCase().trim(),
      otp: otp.trim(),
    });

    if (!existingOTP) {
      logger.warn(`Invalid OTP attempt for ${email}`);
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: 'Invalid or expired OTP',
      });
    }

    // Check if OTP has expired
    if (existingOTP.expiresAt < new Date()) {
      await Otps.findByIdAndDelete(existingOTP._id);
      logger.warn(`Expired OTP attempt for ${email}`);
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: 'OTP has expired',
      });
    }

    // OTP is valid - delete it (one-time use)
    await Otps.findByIdAndDelete(existingOTP._id);
    logger.info(`OTP verified successfully for ${email}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'OTP verification successful',
    });
  } catch (error) {
    logger.error('Error verifying OTP:', error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal server error' });
  }
};
