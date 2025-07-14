// List of required environment variable keys
const requiredEnvVars = [
  'MONGODB_URI',
  // SMTP credentials
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_MAIL',
  'SMTP_APP_PASS',
  // Generic email credentials used by utils/newsletter.js
  'EMAIL_USER',
  'EMAIL_PASSWORD',
  // Notion service
  'NOTION_TOKEN',
  'NOTION_DATABASE_ID',
  // JWT secret (future-proof for auth endpoints)
  'JWT_SECRET',
];

/**
 * Validates presence of mandatory environment variables.
 * If any are missing the process exits with a clear, actionable error message.
 */
module.exports = function validateEnv() {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length) {
    // eslint-disable-next-line no-console
    console.error(
      `❌ Missing required environment variables: ${missing.join(', ')}`,
    );
    process.exit(1);
  }
};