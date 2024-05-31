const express = require('express');
const router = express.Router();
const controller = require('../controllers/posts');

router.get('/posts', controller.getPosts);
router.get('/posts/:id', controller.getPostById);
router.post('/posts', controller.postPost);
router.put('/posts/:id', controller.putPost);
router.delete('/posts/:id', controller.deletePost);

module.exports = router;