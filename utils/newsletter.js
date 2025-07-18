const nodemailer = require('nodemailer');
const logger = require('../logger');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendNewsletter = (email, subject, content) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error('Newsletter error:', error);
    } else {
              logger.info('Newsletter sent: ' + info.response);
    }
  });
};

module.exports = { sendNewsletter };
