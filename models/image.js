const mongoose = require('mongoose');

const Image = mongoose.model('image', {
    imgurl : {type: String}
});

module.exports = Image;