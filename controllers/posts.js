const fs = require('fs');
const path = require('path');

exports.getPosts = async (req, res, next) => {
    try {
        const posts = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/posts.json'), 'utf-8'));
        res.send(posts);
    } catch (error) {
        next(error);
    }
};

exports.getPostById = async (req, res, next) => {
    try {
        const posts = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/posts.json'), 'utf-8'));
        const postId = Number(req.params.id);
        const post = posts.find(post => post.id === postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.send(post);
    } catch (error) {
        next(error);
    }
};

exports.postPost = async (req, res, next) => {
    try {
        const posts = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/posts.json'), 'utf-8'));
        const newPost = req.body;
        newPost.id = posts.length + 1;
        posts.push(newPost);
        fs.writeFileSync(path.resolve(__dirname, '../assets/posts.json'), JSON.stringify(posts, null, 2));
        res.send(newPost);
    } catch (error) {
        next(error);
    }
};

exports.putPost = async (req, res, next) => {
    try {
        const posts = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/posts.json'), 'utf-8'));
        const postId = Number(req.params.id);
        const postIndex = posts.findIndex(post => post.id === postId);
        if (postIndex === -1) {
            return res.status(404).send('Post not found');
        }
        posts[postIndex] = { ...posts[postIndex], ...req.body };
        fs.writeFileSync(path.resolve(__dirname, '../assets/posts.json'), JSON.stringify(posts, null, 2));
        res.send(posts[postIndex]);
    } catch (error) {
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const posts = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../assets/posts.json'), 'utf-8'));
        const postId = Number(req.params.id);
        const postIndex = posts.findIndex(post => post.id === postId);
        if (postIndex === -1) {
            return res.status(404).send('Post not found');
        }
        const deletedPost = posts.splice(postIndex, 1);
        fs.writeFileSync(path.resolve(__dirname, '../assets/posts.json'), JSON.stringify(posts, null, 2));
        res.send(deletedPost);
    } catch (error) {
        next(error);
    }
};