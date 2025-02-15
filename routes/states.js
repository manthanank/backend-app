const express = require('express');
const router = express.Router();
const statesController = require('../controllers/statesController');

/**
 * @swagger
 * tags:
 *   name: States
 *   description: States management
 */

/**
 * @swagger
 * /api/states:
 *   get:
 *     summary: Get all states
 *     tags: [States]
 *     responses:
 *       200:
 *         description: A list of states
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/states', statesController.getStates);

module.exports = router;
