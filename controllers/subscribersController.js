const Subscribers = require('../models/subscribers.js');
const { sendNewsletter } = require('../utils/newsletter.js');

exports.createSubscribers = async (req, res, next) => {
  const email = req.body.email;

  try {
    const existingSubscriber = await Subscribers.findOne({ email });

    if (existingSubscriber) {
      return res.send(
        'Email already subscribed. Check your email for the welcome newsletter.',
      );
    }

    const newSubscriber = new Subscribers({ email });
    await newSubscriber.save();

    console.log(`New subscription: ${email}`);

    const welcomeSubject = 'Welcome to Our Newsletter!';
    let welcomeContent = '<p>Thank you for subscribing to our newsletter!</p>';
    const apiEndpoint =
      req.get('host') === 'localhost:3000'
        ? 'http://localhost:3000'
        : 'https://backend-app-manthanank.vercel.app/';

    welcomeContent += `<p><a href="${apiEndpoint}/unsubscribe?email=${email}">Unsubscribe</a></p>`;
    sendNewsletter(email, welcomeSubject, welcomeContent);

    res.send(
      'Subscription successful! Check your email for a welcome newsletter.',
    );
  } catch (error) {
    console.error('Error creating subscription:', error);
    next(error);
  }
};

exports.unsubscribe = async (req, res, next) => {
  const email = req.body.email;

  try {
    const existingSubscriber = await Subscribers.findOne({ email });

    if (!existingSubscriber) {
      return res.send('Email not subscribed.');
    }

    await Subscribers.findOneAndDelete({ email });

    console.log(`Subscription deleted: ${email}`);

    res.send('Unsubscribed successfully.');
  } catch (error) {
    console.error('Error unsubscribing:', error);
    next(error);
  }
};

exports.getSubscribers = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const ITEMS_PER_PAGE = 10;

  try {
    const [totalSubscribers, data] = await Promise.all([
      Subscribers.countDocuments(),
      Subscribers.find({})
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE),
    ]);

    res.status(200).json({
      success: true,
      message: 'Subscribers retrieved successfully',
      data,
      count: data.length,
      totalSubscribers,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSubscriber = async (req, res, next) => {
  try {
    const data = await Subscribers.findOneAndDelete({ _id: req.params.id });

    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: 'Subscriber not found' });
    }

    res
      .status(200)
      .json({ success: true, message: 'Subscriber deleted successfully' });
  } catch (error) {
    next(error);
  }
};
