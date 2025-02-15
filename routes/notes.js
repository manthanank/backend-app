const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Note management
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: A list of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/notes', notesController.getNotes);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/notes', notesController.createNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note ID
 *     responses:
 *       200:
 *         description: A note object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/notes/:id', notesController.getNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/notes/:id', notesController.updateNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note ID
 *     responses:
 *       200:
 *         description: The deleted note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/notes/:id', notesController.deleteNote);

module.exports = router;
