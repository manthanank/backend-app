const _ = require('lodash');
const Contact = require('../models/contacts.js');

exports.submitForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (_.isEmpty(name) || _.isEmpty(email) || _.isEmpty(message)) {
      return res
        .status(400)
        .json({ message: 'Name, email, and message are required fields' });
    }

    const newContact = new Contact({ name, email, message });

    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getContact = (req, res) => {
  Contact.findOne({ _id: req.params.id })
    .then((data) => {
      if (_.isEmpty(data)) {
        return res
          .status(404)
          .json({ success: false, message: 'Contact not found' });
      }

      res.status(200).json({
        success: true,
        message: 'Contact retrieved successfully',
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    });
};

exports.getContacts = (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const ITEMS_PER_PAGE = 10;

  Promise.all([
    Contact.countDocuments(),
    Contact.find({})
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE),
  ])
    .then(([totalContacts, data]) => {
      res.status(200).json({
        success: true,
        message: 'Contacts retrieved successfully',
        data,
        count: data.length,
        totalContacts,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    });
};

exports.deleteContact = (req, res) => {
  Contact.findOneAndDelete({ _id: req.params.id })
    .then((data) => {
      if (_.isEmpty(data)) {
        return res
          .status(404)
          .json({ success: false, message: 'Contact not found' });
      }

      res
        .status(200)
        .json({ success: true, message: 'Contact deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    });
};
