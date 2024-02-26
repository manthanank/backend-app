const Subscribers = require('../models/subscribers.js');
const { sendNewsletter } = require('../utils/newsletter.js');

exports.createSubscribers = async (req, res, next) => {
    // console.log(req.body);
    const email = req.body.email;

    try {
        // Check if the email already exists in the database
        const existingSubscriber = await Subscribers.findOne({ email });

        if (existingSubscriber) {
            // Email already exists, send a message
            return res.send('Email already subscribed. Check your email for the welcome newsletter.');
        }

        // Email doesn't exist, save to the database
        const newSubscriber = new Subscribers({ email });
        const savedSubscriber = await newSubscriber.save();
        // console.log('Subscription saved to the database:', savedSubscriber);

        // For simplicity, let's just print it to the console
        console.log(`New subscription: ${email}`);

        // Send a welcome newsletter
        const welcomeSubject = 'Welcome to Our Newsletter!';
        const welcomeContent = '<p>Thank you for subscribing to our newsletter!</p>';
        sendNewsletter(email, welcomeSubject, welcomeContent);

        res.send('Subscription successful! Check your email for a welcome newsletter.');
    } catch (error) {
        // Handle database or other errors
        console.error('Error creating subscription:', error);
        next(error);
    }
};

exports.unsubscribe = async (req, res, next) => {
    const email = req.body.email;

    try {
        // Check if the email exists in the database
        const existingSubscriber = await Subscribers.findOne({ email });

        if (!existingSubscriber) {
            // Email doesn't exist, send a message
            return res.send('Email not subscribed.');
        }

        // Email exists, delete from the database
        const deletedSubscriber = await Subscribers.findOneAndDelete({ email });
        // console.log('Subscription deleted from the database:', deletedSubscriber);

        // For simplicity, let's just print it to the console
        console.log(`Subscription deleted: ${email}`);

        res.send('Unsubscribed successfully.');
    } catch (error) {
        // Handle database or other errors
        console.error('Error unsubscribing:', error);
        next(error);
    }
};

exports.getSubscribers = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const ITEMS_PER_PAGE = 10; // Set your desired items per page

    // Use Promise.all to perform both queries concurrently
    Promise.all([
        Subscribers.find({}).countDocuments(), // Get the total count of subscribers
        Subscribers.find({})
            .skip((page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE) // Get subscribers for the current page
    ])
    .then(([totalSubscribers, data]) => {
        res.status(200).json({
            success: true,
            message: 'Subscribers retrieved successfully',
            data: data,
            count: data.length,
            totalSubscribers: totalSubscribers
        });
    })
    .catch((error) => {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    });
};

exports.deleteSubscriber = (req, res, next) => {
    Subscribers.findOneAndDelete({ _id: req.params.id })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ success: false, message: 'Subscriber not found' });
            }

            res.status(200).json({ success: true, message: 'Subscriber deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
        });
}