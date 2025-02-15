const express = require('express');
const router = express.Router();
const jokesController = require('../controllers/jokesController');

/**
 * @swagger
 * tags:
 *   name: Jokes
 *   description: Jokes API endpoints
 */

/**
 * @swagger
 * /api/jokes:
 *   get:
 *     summary: Get all jokes
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: List of all jokes
 */
router.get('/', jokesController.getJokes);

/**
 * @swagger
 * /api/jokes/random:
 *   get:
 *     summary: Get a random joke
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: A random joke
 */
router.get('/random', jokesController.getRandomJoke);

/**
 * @swagger
 * /api/jokes/{id}:
 *   get:
 *     summary: Get joke by ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Joke ID
 *     responses:
 *       200:
 *         description: A joke object
 *       404:
 *         description: Joke not found
 */
router.get('/:id', jokesController.getJokeById);

module.exports = router;