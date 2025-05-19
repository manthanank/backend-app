const BookService = require('../services/books');
const logger = require('../logger');

class BookController {
  constructor() {
    this.bookService = new BookService();
  }

  /**
   * Send a formatted response
   * @param {Response} res - Express response object
   * @param {number} status - HTTP status code
   * @param {object|string} data - Response data or error message
   */
  sendResponse(res, status, data) {
    if (status >= 400) {
      logger.error(`Error in book controller: ${typeof data === 'string' ? data : data.message}`);
      return res.status(status).json({
        success: false,
        error: typeof data === 'string' ? data : data.message,
      });
    }
    return res.status(status).json({
      success: true,
      data,
    });
  }

  /**
   * Create a new book
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  async create(req, res) {
    try {
      // Validation already handled by middleware
      const book = await this.bookService.create(req.body);
      return this.sendResponse(res, 201, book);
    } catch (err) {
      return this.sendResponse(res, 500, err);
    }
  }

  /**
   * Get a book by ID
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  async read(req, res) {
    try {
      const { id } = req.params;
      const book = await this.bookService.read(id);
      if (!book) {
        return this.sendResponse(res, 404, 'Book not found');
      }
      return this.sendResponse(res, 200, book);
    } catch (err) {
      return this.sendResponse(res, 500, err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      // Validation already handled by middleware
      const book = await this.bookService.update(id, req.body);
      if (!book) {
        return this.sendResponse(res, 404, 'Book not found');
      }
      return this.sendResponse(res, 200, book);
    } catch (err) {
      return this.sendResponse(res, 500, err);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const book = await this.bookService.delete(id);
      if (!book) {
        return this.sendResponse(res, 404, 'Book not found');
      }
      return this.sendResponse(res, 200, {
        message: 'Book deleted successfully',
        book,
      });
    } catch (err) {
      return this.sendResponse(res, 500, err);
    }
  }

  /**
   * Get all books with filtering, pagination and sorting
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  async getAll(req, res) {
    try {
      // Extract filter parameters
      const { title, author, publishedYear, genre } = req.query;
      const filters = {};
      
      if (title) filters.title = title;
      if (author) filters.author = author;
      if (publishedYear) filters.publishedYear = parseInt(publishedYear);
      if (genre) filters.genre = genre;
      
      // Extract pagination and sorting parameters
      const { page, limit, sortBy, sortOrder } = req.query;
      const options = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
        sortBy: sortBy || 'createdAt',
        sortOrder: sortOrder || 'desc'
      };
      
      const result = await this.bookService.getAll(filters, options);
      return this.sendResponse(res, 200, result);
    } catch (err) {
      return this.sendResponse(res, 500, err);
    }
  }
  
  /**
   * Search books by keyword
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  async search(req, res) {
    try {
      const { keyword } = req.query;
      if (!keyword) {
        return this.sendResponse(res, 400, 'Search keyword is required');
      }
      
      const books = await this.bookService.search(keyword);
      return this.sendResponse(res, 200, books);
    } catch (err) {
      return this.sendResponse(res, 500, err);
    }
  }
  
  /**
   * Get books by author
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  async getByAuthor(req, res) {
    try {
      const { author } = req.params;
      if (!author) {
        return this.sendResponse(res, 400, 'Author name is required');
      }
      
      const books = await this.bookService.getByAuthor(author);
      return this.sendResponse(res, 200, books);
    } catch (err) {
      return this.sendResponse(res, 500, err);
    }
  }
}

module.exports = BookController;
