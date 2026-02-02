const mongoose = require('mongoose');
const { OTP, TIME } = require('../config/constants');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + OTP.EXPIRY_MINUTES * TIME.ONE_MINUTE),
    index: { expireAfterSeconds: 0 }, // TTL index for automatic cleanup
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

// Compound index for efficient lookups
otpSchema.index({ email: 1, otp: 1 });

const Otps = mongoose.model('otps', otpSchema);

module.exports = Otps;
