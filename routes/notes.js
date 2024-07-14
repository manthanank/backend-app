const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes');

router.get('/notes', notesController.getNotes);
router.post('/notes', notesController.createNote);
router.get('/notes/:id', notesController.getNote);
router.put('/notes/:id', notesController.updateNote);
router.delete('/notes/:id', notesController.deleteNote);

module.exports = router;