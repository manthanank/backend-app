const mongoose = require('mongoose');

const Blogs = mongoose.model('blogs', {
    title : {type: String},
    url: {type: String},
    imgurl: {type: String}
});

module.exports = Blogs;