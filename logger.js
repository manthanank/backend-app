const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, json, colorize } = format;
const winstonMongoDB = require('winston-mongodb');

// Define custom log levels
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'gray',
  },
};

// Define custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create the logger
const logger = createLogger({
  levels: customLevels.levels,
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), logFormat),
    }),
  ],
});

// Add file transport for local development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.File({ filename: 'app.log', format: json() }));
} else {
  // Add MongoDB transport for production
  logger.add(new winstonMongoDB.MongoDB({
    db: process.env.MONGODB_URI,
    collection: 'logs',
    format: json(),
    level: 'info',
  }));
}

// Add colors to the custom levels
require('winston').addColors(customLevels.colors);

module.exports = logger;