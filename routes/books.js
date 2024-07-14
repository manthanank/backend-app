const express = require('express');
const BookController = require('../controllers/books');

const router = express.Router();
const bookController = new BookController();

router.post('/books', (req, res) => bookController.create(req, res));
router.get('/books/:id', (req, res) => bookController.read(req, res));
router.put('/books/:id', (req, res) => bookController.update(req, res));
router.delete('/books/:id', (req, res) => bookController.delete(req, res));
router.get('/books', (req, res) => bookController.getAll(req, res));

module.exports = router;