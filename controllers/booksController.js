const BookService = require('../services/books');

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

  async create(req, res) {
    try {
      const { title, author } = req.body;
      if (!title || !author) {
        return this.sendResponse(res, 400, 'Title and author are required');
      }
      const book = await this.bookService.create(title, author);
      return this.sendResponse(res, 201, book);
    } catch (err) {
      return this.sendResponse(res, 500, err);
    }
  }

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
      const { title, author } = req.body;
      if (!title && !author) {
        return this.sendResponse(
          res,
          400,
          'At least one field (title or author) is required',
        );
      }
      const book = await this.bookService.update(id, title, author);
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

  async getAll(req, res) {
    try {
      const books = await this.bookService.getAll();
      return this.sendResponse(res, 200, books);
    } catch (err) {
      return this.sendResponse(res, 500, err);
    }
  }
}

module.exports = BookController;
