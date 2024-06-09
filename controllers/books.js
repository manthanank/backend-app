const BookService = require('../services/books');

class BookController {
    constructor() {
        this.bookService = new BookService();
    }

    async create(req, res) {
        const { title, author } = req.body;
        try {
            const book = await this.bookService.create(title, author);
            res.json(book);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async read(req, res) {
        const { id } = req.params;
        try {
            const book = await this.bookService.read(id);
            if (book) {
                res.json(book);
            } else {
                res.status(404).send('Book not found');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { title, author } = req.body;
        try {
            const book = await this.bookService.update(id, title, author);
            if (book) {
                res.json(book);
            } else {
                res.status(404).send('Book not found');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const book = await this.bookService.delete(id);
            if (book) {
                res.json(book);
            } else {
                res.status(404).send('Book not found');
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getAll(req, res) {
        try {
            const books = await this.bookService.getAll();
            res.json(books);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = BookController;
