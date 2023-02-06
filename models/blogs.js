const mongoose = require('mongoose');

const Blogs = mongoose.model('blogs', {
    title : {type: String},
    url: {type: String}
});

module.exports = Blogs;