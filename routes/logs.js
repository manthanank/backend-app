const express = require('express');
const router = express.Router();
const controller = require('../controllers/logsController');

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Log management
 */

/**
 * @swagger
 * /api/logs:
 *   post:
 *     summary: Create a new log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: The created log
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/logs', controller.postLogs);

/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get all logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: A list of logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/logs', controller.getLogs);

module.exports = router;