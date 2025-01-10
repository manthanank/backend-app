const express = require('express');
const router = express.Router();
const controllers = require('../controllers/simpleapisController');

/**
 * @swagger
 * tags:
 *   name: SimpleAPIs
 *   description: Simple API endpoints
 */

/**
 * @swagger
 * /api/coffee/hot:
 *   get:
 *     summary: Get hot coffee
 *     tags: [SimpleAPIs]
 *     responses:
 *       200:
 *         description: A list of hot coffee
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/coffee/hot', controllers.getCoffeeHot);

/**
 * @swagger
 * /api/beers/ale:
 *   get:
 *     summary: Get ale beers
 *     tags: [SimpleAPIs]
 *     responses:
 *       200:
 *         description: A list of ale beers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/beers/ale', controllers.getBeersAle);

/**
 * @swagger
 * /api/switch/games:
 *   get:
 *     summary: Get Switch games
 *     tags: [SimpleAPIs]
 *     responses:
 *       200:
 *         description: A list of Switch games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/switch/games', controllers.getSwitchGames);

/**
 * @swagger
 * /api/wines/reds:
 *   get:
 *     summary: Get red wines
 *     tags: [SimpleAPIs]
 *     responses:
 *       200:
 *         description: A list of red wines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/wines/reds', controllers.getWinesReds);

/**
 * @swagger
 * /api/futurama/info:
 *   get:
 *     summary: Get Futurama info
 *     tags: [SimpleAPIs]
 *     responses:
 *       200:
 *         description: Futurama info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/futurama/info', controllers.getFuturamaInfo);

/**
 * @swagger
 * /api/codingresources/codingResources:
 *   get:
 *     summary: Get coding resources
 *     tags: [SimpleAPIs]
 *     responses:
 *       200:
 *         description: A list of coding resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/codingresources/codingResources', controllers.getCodingResources);

/**
 * @swagger
 * /api/coffee/hot/{id}:
 *   get:
 *     summary: Get hot coffee by ID
 *     tags: [SimpleAPIs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The coffee ID
 *     responses:
 *       200:
 *         description: A hot coffee item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/coffee/hot/:id', controllers.getCoffeeHotById);

module.exports = router;