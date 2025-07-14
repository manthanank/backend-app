const _ = require('lodash');
const Contact = require('../models/contacts.js');

/**
 * Submit a new contact form
 * @route POST /api/contacts
 * @access Public
 */
exports.submitForm = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (_.isEmpty(name) || _.isEmpty(email) || _.isEmpty(message)) {
      return res
        .status(400)
        .json({ 
          success: false,
          message: 'Name, email, and message are required fields' 
        });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ 
      success: true,
      message: 'Contact form submitted successfully' 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single contact by ID
 * @route GET /api/contacts/:id
 * @access Public
 */
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Contact retrieved successfully',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all contacts with pagination
 * @route GET /api/contacts
 * @access Public
 */
exports.getContacts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const ITEMS_PER_PAGE = 10;
    
    const [totalContacts, contacts] = await Promise.all([
      Contact.countDocuments(),
      Contact.find({})
        .sort({ createdAt: -1 })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE),
    ]);

    res.status(200).json({
      success: true,
      message: 'Contacts retrieved successfully',
      data: contacts,
      count: contacts.length,
      totalContacts,
      totalPages: Math.ceil(totalContacts / ITEMS_PER_PAGE),
      currentPage: page
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a contact by ID
 * @route DELETE /api/contacts/:id
 * @access Public
 */
exports.deleteContact = async (req, res, next) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedContact) {
      return res
        .status(404)
        .json({ success: false, message: 'Contact not found' });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Contact deleted successfully' 
    });
  } catch (error) {
    next(error);
  }
};
