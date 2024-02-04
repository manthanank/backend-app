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

//get all contacts
exports.getContacts = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const ITEMS_PER_PAGE = 10; // Set your desired items per page

    // Use Promise.all to perform both queries concurrently
    Promise.all([
        Contact.find({}).countDocuments(), // Get the total count of contacts
        Contact.find({})
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE) // Get contacts for the current page
    ])
    .then(([totalContacts, data]) => {
        res.status(200).json({
            success: true,
            message: 'Contacts retrieved successfully',
            data: data,
            count: data.length,
            totalContacts: totalContacts
        });
    })
    .catch((error) => {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    });
}


//delete contacts
exports.deleteContact = (req, res, next) => {
    Contact.findOneAndDelete({ _id: req.params.id })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ success: false, message: 'Contact not found' });
            }

            res.status(200).json({ success: true, message: 'Contact deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
        });
}