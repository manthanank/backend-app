const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locationsController');

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Locations management
 */

/**
 * @swagger
 * /api/locations/states:
 *   get:
 *     summary: Get all states
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: A list of states
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/states', locationsController.getStates);

/**
 * @swagger
 * /api/locations/districts/{state}:
 *   get:
 *     summary: Get districts by state
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         schema:
 *           type: string
 *         description: The state name
 *     responses:
 *       200:
 *         description: A list of districts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/districts/:state', locationsController.getDistricts);

module.exports = router;