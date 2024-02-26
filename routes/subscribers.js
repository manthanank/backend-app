const express = require('express');
const router = express.Router();
const subscribersController = require('../controllers/subscribers');

router.post('/subscribe', subscribersController.createSubscribers);
router.get('/subscribers', subscribersController.getSubscribers);
router.delete('/subscribers/:id', subscribersController.deleteSubscriber);
router.post('/unsubscribe', subscribersController.unsubscribe);

module.exports = router;