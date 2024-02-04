const express = require('express');
const router = express.Router();
const subscribersController = require('../controllers/subscribers');

router.post('/subscribe', subscribersController.createSubscribers);
router.get('/subscribers', subscribersController.getSubscribers);
router.delete('/subscribers/:id', subscribersController.deleteSubscriber);

module.exports = router;