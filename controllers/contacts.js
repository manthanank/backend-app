const Contact = require('../models/contacts.js');

exports.submitForm = async (req, res, next) => {
    try {
        // Create a new contact instance
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        });

        // Save the contact to the database
        await newContact.save();

        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}