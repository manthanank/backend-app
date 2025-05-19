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

// Middleware exports
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
