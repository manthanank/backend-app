const itemService = require('../services/items');
const { validationResult } = require('express-validator');

/**
 * Handle validation errors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {boolean} - True if validation failed, false otherwise
 */
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ 
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
    return true;
  }
  return false;
};

/**
 * Create a new item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.createItem = async (req, res, next) => {
  try {
    if (handleValidationErrors(req, res)) return;
    
    const item = await itemService.createItem(req.body);
    res.status(201).json({
      status: 'success',
      data: item
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all items with pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getItems = async (req, res, next) => {
  try {
    // Extract query parameters
    const { 
      page, 
      limit, 
      sort,
      category,
      minPrice,
      maxPrice,
      isAvailable,
      search,
      tags
    } = req.query;
    
    // Convert sort parameter (e.g., "createdAt:desc" to { createdAt: -1 })
    let sortOptions = {};
    if (sort) {
      const [field, direction] = sort.split(':');
      sortOptions[field] = direction === 'desc' ? -1 : 1;
    }
    
    // Process tags if it's a comma-separated string
    let processedTags;
    if (tags) {
      processedTags = tags.includes(',') ? tags.split(',') : tags;
    }
    
    // Build the filter object
    const filter = {
      category,
      minPrice,
      maxPrice,
      isAvailable,
      search,
      tags: processedTags
    };
    
    // Remove undefined values from filter
    Object.keys(filter).forEach(key => {
      if (filter[key] === undefined) {
        delete filter[key];
      }
    });
    
    const result = await itemService.getItems({
      page,
      limit,
      sort: sortOptions,
      filter
    });
    
    res.json({
      status: 'success',
      data: result.items,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        pages: result.pages
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get an item by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getItemById = async (req, res, next) => {
  try {
    const item = await itemService.getItemById(req.params.id);
    res.json({
      status: 'success',
      data: item
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update an item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.updateItem = async (req, res, next) => {
  try {
    if (handleValidationErrors(req, res)) return;
    
    const updatedItem = await itemService.updateItem(req.params.id, req.body);
    res.json({
      status: 'success',
      data: updatedItem
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete an item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.deleteItem = async (req, res, next) => {
  try {
    const result = await itemService.deleteItem(req.params.id);
    res.json({
      status: 'success',
      ...result
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get item statistics for analytics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getItemStats = async (req, res, next) => {
  try {
    const stats = await itemService.getItemStats();
    res.json({
      status: 'success',
      data: stats
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Add tags to an item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.addItemTags = async (req, res, next) => {
  try {
    if (handleValidationErrors(req, res)) return;
    
    const { tags } = req.body;
    const updatedItem = await itemService.addItemTags(req.params.id, tags);
    res.json({
      status: 'success',
      data: updatedItem
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Remove tags from an item
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.removeItemTags = async (req, res, next) => {
  try {
    if (handleValidationErrors(req, res)) return;
    
    const { tags } = req.body;
    const updatedItem = await itemService.removeItemTags(req.params.id, tags);
    res.json({
      status: 'success',
      data: updatedItem
    });
  } catch (err) {
    next(err);
  }
};
