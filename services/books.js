const Book = require('../models/books');

class BookService {
    async create(title, author) {
        const book = new Book({ title, author });
        await book.save();
        return book;
    }

    async read(id) {
        return Book.findById(id);
    }

    async update(id, title, author) {
        return Book.findByIdAndUpdate(id, { title, author }, { new: true });
    }

    async delete(id) {
        return Book.findByIdAndDelete(id);
    }

    async getAll() {
        return Book.find();
    }
}

module.exports = BookService;
