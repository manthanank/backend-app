const Otps = require('../models/otp.js');
const randomstring = require('randomstring');
const sendEmail = require('../utils/sendEmails.js');
const logger = require('../logger');

// Generate OTP
function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: 'numeric',
  });
}

// Send OTP to the provided email
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address' });
    }

    const otp = generateOTP(); // Generate a 6-digit OTP
    const newOTP = new Otps({ email, otp });
    await newOTP.save();

    // Send OTP via email
    await sendEmail({
      to: email,
      subject: 'Your OTP',
      message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });

    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    logger.error('Error sending OTP:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

// Verify OTP provided by the user
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Validate inputs
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address' });
    }
    
    if (!otp || !/^\d{6}$/.test(otp)) {
      return res.status(400).json({ success: false, error: 'Invalid OTP format' });
    }

    const existingOTP = await Otps.findOneAndDelete({ email, otp });

    if (existingOTP) {
      // OTP is valid
      res
        .status(200)
        .json({ success: true, message: 'OTP verification successful' });
    } else {
      // OTP is invalid
      res.status(400).json({ success: false, error: 'Invalid OTP' });
    }
  } catch (error) {
    logger.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
