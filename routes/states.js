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
router.get('/states', statesController.getAllStates);

/**
 * @swagger
 * /api/states:
 *   post:
 *     summary: Create a new state
 *     tags: [States]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: The created state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/states', statesController.createState);

/**
 * @swagger
 * /api/states/{id}:
 *   put:
 *     summary: Update a state
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The state ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: The updated state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/states/:id', statesController.updateState);

/**
 * @swagger
 * /api/states/{id}:
 *   delete:
 *     summary: Delete a state
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The state ID
 *     responses:
 *       200:
 *         description: The deleted state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/states/:id', statesController.deleteState);

module.exports = router;