const mongoose = require('mongoose');

const Blogs = mongoose.model('blogs', {
    title : {type: String},
    content : {type: String},
    author : {type: String},
    date : {type: Date, default: Date.now}
});

module.exports = Blogs;