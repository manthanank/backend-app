const mongoose = require('mongoose');

const Contacts = mongoose.model('contacts', {
    name: { type: String },
    email: { type: String },
    message: { type: String }
});

module.exports = Contacts;