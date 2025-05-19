const Book = require('../models/books');

class BookService {
  /**
   * Create a new book
   * @param {Object} bookData - Book data
   * @returns {Promise<Object>} Created book
   */
  async create(bookData) {
    const book = new Book(bookData);
    await book.save();
    return book;
  }

  /**
   * Get a book by id
   * @param {string} id - Book id
   * @returns {Promise<Object>} Found book
   */
  async read(id) {
    return Book.findById(id);
  }

  /**
   * Update a book
   * @param {string} id - Book id
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated book
   */
  async update(id, updateData) {
    return Book.findByIdAndUpdate(id, updateData, { 
      new: true,
      runValidators: true
    });
  }

  /**
   * Delete a book
   * @param {string} id - Book id
   * @returns {Promise<Object>} Deleted book
   */
  async delete(id) {
    return Book.findByIdAndDelete(id);
  }

  /**
   * Get all books with optional filtering
   * @param {Object} filters - Optional query filters
   * @param {Object} options - Pagination and sorting options
   * @returns {Promise<Object[]>} List of books
   */
  async getAll(filters = {}, options = {}) {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    
    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    
    // Build query from filters
    const query = {};
    
    if (filters.title) {
      query.title = { $regex: filters.title, $options: 'i' };
    }
    
    if (filters.author) {
      query.author = { $regex: filters.author, $options: 'i' };
    }
    
    if (filters.publishedYear) {
      query.publishedYear = filters.publishedYear;
    }
    
    if (filters.genre) {
      query.genre = filters.genre;
    }
    
    // Execute query with pagination
    const books = await Book.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await Book.countDocuments(query);
    
    return {
      data: books,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    };
  }
  
  /**
   * Search books by keyword
   * @param {string} keyword - Search keyword
   * @returns {Promise<Object[]>} List of matching books
   */
  async search(keyword) {
    return Book.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { author: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ]
    });
  }
  
  /**
   * Get books by author
   * @param {string} author - Author name
   * @returns {Promise<Object[]>} List of books by author
   */
  async getByAuthor(author) {
    return Book.find({ author: { $regex: author, $options: 'i' } });
  }
}

module.exports = BookService;
