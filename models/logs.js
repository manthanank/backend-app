const mongoose = require('mongoose');

const Logs = mongoose.model('logs', {
    level: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = Logs;