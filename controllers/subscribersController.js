const Subscribers = require('../models/subscribers.js');
const emailService = require('../services/emailService.js');
const logger = require('../logger');
const { PAGINATION, HTTP_STATUS, EMAIL } = require('../config/constants');

exports.createSubscribers = async (req, res, next) => {
  const email = req.body.email;

  try {
    const existingSubscriber = await Subscribers.findOne({ email });

    if (existingSubscriber) {
      return res.status(HTTP_STATUS.OK).json({
        success: true,
        message:
          'Email already subscribed. Check your email for the welcome newsletter.',
      });
    }

    const newSubscriber = new Subscribers({ email });
    await newSubscriber.save();

    logger.info(`New subscription: ${email}`);

    const welcomeSubject = EMAIL.NEWSLETTER_WELCOME_SUBJECT;
    let welcomeContent = '<p>Thank you for subscribing to our newsletter!</p>';

    // Construct API endpoint from environment variables
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const domain = process.env.DOMAIN || req.get('host') || 'localhost:3000';
    const apiEndpoint = `${protocol}://${domain}`;

    welcomeContent += `<p><a href="${apiEndpoint}/unsubscribe?email=${email}">Unsubscribe</a></p>`;
    await emailService.sendNewsletter(email, welcomeSubject, welcomeContent);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message:
        'Subscription successful! Check your email for a welcome newsletter.',
      data: { email },
    });
  } catch (error) {
    logger.error('Error creating subscription:', error);
    next(error);
  }
};

exports.unsubscribe = async (req, res, next) => {
  const email = req.body.email;

  try {
    const existingSubscriber = await Subscribers.findOne({ email });

    if (!existingSubscriber) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: 'Email not subscribed.',
      });
    }

    await Subscribers.findOneAndDelete({ email });

    logger.info(`Subscription deleted: ${email}`);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Unsubscribed successfully.',
      data: { email },
    });
  } catch (error) {
    logger.error('Error unsubscribing:', error);
    next(error);
  }
};

exports.getSubscribers = async (req, res) => {
  const page = parseInt(req.query.page) || PAGINATION.DEFAULT_PAGE;
  const itemsPerPage = parseInt(req.query.limit) || PAGINATION.DEFAULT_LIMIT;

  try {
    const [totalSubscribers, data] = await Promise.all([
      Subscribers.countDocuments(),
      Subscribers.find({})
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage),
    ]);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Subscribers retrieved successfully',
      data,
      count: data.length,
      totalSubscribers,
      pagination: {
        currentPage: page,
        itemsPerPage,
        totalPages: Math.ceil(totalSubscribers / itemsPerPage),
      },
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    const data = await Subscribers.findOneAndDelete({ _id: req.params.id });

    if (!data) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ success: false, message: 'Subscriber not found' });
    }

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: 'Subscriber deleted successfully' });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
