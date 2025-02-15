const express = require('express');
const router = express.Router();
const usesController = require('../controllers/usesController');

/**
 * @swagger
 * tags:
 *   name: Uses
 *   description: Uses management
 */

/**
 * @swagger
 * /api/uses:
 *   get:
 *     summary: Get Uses
 *     tags: [Uses]
 *     responses:
 *       200:
 *         description: A list of uses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', usesController.getUses);

module.exports = router;