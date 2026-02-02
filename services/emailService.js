const nodemailer = require('nodemailer');
const logger = require('../logger');
const { EMAIL, OTP } = require('../config/constants');

/**
 * Email Service
 * Unified email service for sending emails using SMTP configuration
 */
class EmailService {
  constructor() {
    this.transporter = null;
    this.initialized = false;
  }

  /**
   * Initialize the email transporter
   */
  initialize() {
    if (this.initialized) {
      return;
    }

    if (
      !process.env.SMPT_HOST ||
      !process.env.SMPT_PORT ||
      !process.env.SMPT_MAIL ||
      !process.env.SMPT_APP_PASS
    ) {
      logger.warn(
        'Email configuration is missing. Email functionality will be disabled.',
      );
      return;
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: parseInt(process.env.SMPT_PORT, 10),
        secure: process.env.SMPT_PORT === '465', // Use SSL for port 465
        auth: {
          user: process.env.SMPT_MAIL,
          pass: process.env.SMPT_APP_PASS,
        },
        authMethod: 'LOGIN',
      });

      this.initialized = true;
      logger.info('Email service initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize email service:', error);
      throw error;
    }
  }

  /**
   * Send an email
   * @param {Object} options - Email options
   * @param {string} options.to - Recipient email address
   * @param {string} options.subject - Email subject
   * @param {string} options.message - Email HTML content
   * @returns {Promise<Object>} - Email send result
   */
  async sendEmail({ to, subject, message }) {
    if (!this.initialized) {
      this.initialize();
    }

    if (!this.transporter) {
      throw new Error('Email service is not configured');
    }

    try {
      const mailOptions = {
        from: process.env.SMPT_MAIL,
        to,
        subject,
        html: message,
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${to}`);
      return { success: true, info };
    } catch (error) {
      logger.error(`Error sending email to ${to}:`, error);
      throw error;
    }
  }

  /**
   * Send a newsletter email
   * @param {string} email - Recipient email address
   * @param {string} subject - Email subject
   * @param {string} content - Email HTML content
   * @returns {Promise<Object>} - Email send result
   */
  async sendNewsletter(email, subject, content) {
    return this.sendEmail({
      to: email,
      subject,
      message: content,
    });
  }

  /**
   * Send OTP email
   * @param {string} email - Recipient email address
   * @param {string} otp - OTP code
   * @returns {Promise<Object>} - Email send result
   */
  async sendOTP(email, otp) {
    return this.sendEmail({
      to: email,
      subject: EMAIL.OTP_SUBJECT,
      message: `<p>Your OTP is: <strong>${otp}</strong></p><p>This OTP will expire in ${OTP.EXPIRY_MINUTES} minutes.</p>`,
    });
  }

  /**
   * Verify email configuration
   * @returns {Promise<boolean>} - True if configuration is valid
   */
  async verifyConfiguration() {
    if (!this.initialized) {
      this.initialize();
    }

    if (!this.transporter) {
      return false;
    }

    try {
      await this.transporter.verify();
      logger.info('Email configuration verified successfully');
      return true;
    } catch (error) {
      logger.error('Email configuration verification failed:', error);
      return false;
    }
  }
}

// Export singleton instance
const emailService = new EmailService();
module.exports = emailService;
