const Contact = require('../models/contacts.js');

exports.submitForm = async (req, res, next) => {
    // console.log(req.body);
    try {
        const { name, email, message } = req.body;

        // Basic validations
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required fields' });
        }

        // // Additional email validation using a regular expression
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //     return res.status(400).json({ message: 'Invalid email address' });
        // }

        // // Validate message length
        // if (message.length < 10) {
        //     return res.status(400).json({ message: 'Message should be at least 10 characters long' });
        // }

        // Create a new contact instance
        const newContact = new Contact({
            name: name,
            email: email,
            message: message,
        });

        // Save the contact to the database
        await newContact.save();

        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}