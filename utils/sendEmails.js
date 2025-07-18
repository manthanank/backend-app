const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {
  // Use correctly-spelled `SMTP_` environment variables so that configuration
  // coming from the runtime (and from the test harness) is picked up properly.
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST || process.env.SMPT_HOST,
    port: process.env.SMTP_PORT || process.env.SMPT_PORT,
    secure: true, // Use SSL
    auth: {
      user: process.env.SMTP_MAIL || process.env.SMPT_MAIL,
      pass: process.env.SMTP_APP_PASS || process.env.SMPT_APP_PASS,
    },
    authMethod: 'LOGIN', // Specify the authentication method
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL || process.env.SMPT_MAIL,
    to: options.to,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
