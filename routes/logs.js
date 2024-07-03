const express = require('express');
const router = express.Router();
const controller = require('../controllers/logs');

router.post('/logs', controller.postLogs);
router.get('/logs', controller.getLogs);

module.exports = router;