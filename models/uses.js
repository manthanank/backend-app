const mongoose = require('mongoose');

const Uses = mongoose.model('uses', {
    laptop : {type: String}
});

module.exports = Uses;