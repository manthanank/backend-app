const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

router.post('/contact', contactsController.submitForm );

module.exports = router;