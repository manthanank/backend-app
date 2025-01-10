const Blogs = require('../models/blogs');

exports.getBlogs = (req, res, next) => {
    try {
        Blogs.find({}).then((data) => {
            res.send(data);
        });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getBlog = (req, res, next) => {
    try {
        Blogs.findOne({ _id: req.params.id }).then((data) => {
            res.send(data);
        });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

exports.createBlog = (req, res, next) => {
    try {
        Blogs.create(req.body).then((data) => {
            res.send(data);
        });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

exports.updateBlog = (req, res, next) => {
    try {
        Blogs.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then((data) => {
            res.send(data);
        }
        );
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};

exports.deleteBlog = (req, res, next) => {
    try {
        Blogs.findOneAndDelete({ _id: req.params.id }).then((data) => {
            res.send(data);
        });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}
