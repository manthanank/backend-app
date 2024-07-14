const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogs');

router.get('/blogs', blogsController.getBlogs);
router.get('/blogs/:id', blogsController.getBlog);
router.post('/blogs', blogsController.createBlog);
router.put('/blogs/:id', blogsController.updateBlog);
router.delete('/blogs/:id', blogsController.deleteBlog);

module.exports = router;