const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getUserById);
router.post('/users', controller.postUser);
router.put('/users/:id', controller.putUser);
router.delete('/users/:id', controller.deleteUser);

module.exports = router;