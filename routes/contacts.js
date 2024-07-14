const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

router.post('/contact', contactsController.submitForm );
router.get('/contacts', contactsController.getContacts );
router.get('/contacts/:id', contactsController.getContact );
router.delete('/contacts/:id', contactsController.deleteContact );

module.exports = router;