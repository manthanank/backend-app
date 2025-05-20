const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware to handle validation errors
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      details: errors.array(),
    });
  }
  next();
};

/**
 * Item validation rules
 */
const itemValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom(value => value >= 0)
    .withMessage('Price cannot be negative'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('isAvailable must be a boolean'),
  body('category')
    .optional()
    .trim()
    .isString()
    .withMessage('Category must be a string'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
];

/**
 * Item ID parameter validation rules
 */
const itemIdValidationRules = [
  param('id')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Item ID is required')
    .isMongoId()
    .withMessage('Invalid Item ID format'),
];

/**
 * Validate query parameters for item listing
 */
const itemQueryValidationRules = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sort')
    .optional()
    .isString()
    .withMessage('Sort parameter should be a string in format field:direction')
    .custom(value => {
      const [field, direction] = value.split(':');
      const validFields = ['name', 'price', 'createdAt', 'updatedAt', 'quantity'];
      const validDirections = ['asc', 'desc'];
      
      if (!validFields.includes(field)) {
        throw new Error(`Sort field must be one of: ${validFields.join(', ')}`);
      }
      
      if (direction && !validDirections.includes(direction)) {
        throw new Error('Sort direction must be either "asc" or "desc"');
      }
      
      return true;
    }),
  query('category')
    .optional()
    .isString()
    .withMessage('Category must be a string'),
  query('minPrice')
    .optional()
    .isNumeric()
    .withMessage('Minimum price must be a number')
    .custom(value => value >= 0)
    .withMessage('Minimum price cannot be negative'),
  query('maxPrice')
    .optional()
    .isNumeric()
    .withMessage('Maximum price must be a number')
    .custom(value => value >= 0)
    .withMessage('Maximum price cannot be negative')
    .custom((value, { req }) => {
      const minPrice = req.query.minPrice;
      if (minPrice && parseFloat(value) < parseFloat(minPrice)) {
        throw new Error('Maximum price must be greater than or equal to minimum price');
      }
      return true;
    }),
  query('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('isAvailable must be a boolean value (true or false)'),
  query('search')
    .optional()
    .isString()
    .withMessage('Search query must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query must be between 2 and 100 characters'),
  query('tags')
    .optional()
    .isString()
    .withMessage('Tags must be a comma-separated string'),
  validate,
];

/**
 * Tags validation rules
 */
const tagsValidationRules = [
  body('tags')
    .isArray({ min: 1 })
    .withMessage('Tags must be a non-empty array'),
  body('tags.*')
    .isString()
    .withMessage('Each tag must be a string')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Each tag must be between 1 and 50 characters')
];

/**
 * Book validation rules
 */
const bookValidationRules = [
  body('title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title must be less than 200 characters'),
  body('author')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Author is required')
    .isLength({ max: 100 })
    .withMessage('Author must be less than 100 characters'),
];

/**
 * Book ID parameter validation rules
 */
const bookIdValidationRules = [
  param('id')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Book ID is required')
    .isMongoId()
    .withMessage('Invalid Book ID format'),
];

// Item middleware exports
exports.validateItem = [...itemValidationRules, validate];
exports.validateItemId = [...itemIdValidationRules, validate];
exports.validateItemUpdate = [
  ...itemIdValidationRules,
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number')
    .custom(value => value >= 0)
    .withMessage('Price cannot be negative'),
  body('quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('isAvailable must be a boolean'),
  body('category')
    .optional()
    .trim()
    .isString()
    .withMessage('Category must be a string'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  validate,
];
exports.validateItemQuery = itemQueryValidationRules;
// Export the tags validators
exports.validateTags = [...itemIdValidationRules, ...tagsValidationRules, validate];

// Book middleware exports
exports.validateBook = [...bookValidationRules, validate];
exports.validateBookId = [...bookIdValidationRules, validate];
exports.validateBookUpdate = [
  ...bookIdValidationRules,
  body('title')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title must be less than 200 characters'),
  body('author')
    .optional()
    .trim()
    .not()
    .isEmpty()
    .withMessage('Author cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Author must be less than 100 characters'),
  validate,
];

/**
 * Validate query parameters for book listing
 */
exports.validateBookQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('sortBy')
    .optional()
    .isIn(['title', 'author', 'publishedYear', 'createdAt', 'updatedAt'])
    .withMessage('Invalid sort field'),
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  query('publishedYear')
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() + 1 })
    .withMessage('Published year must be valid'),
  validate,
];
