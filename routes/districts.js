const express = require('express');
const router = express.Router();
const districtsController = require('../controllers/districtsController');

/**
 * @swagger
 * tags:
 *   name: Districts
 *   description: District management
 */

/**
 * @swagger
 * /api/districts:
 *   get:
 *     summary: Get all districts
 *     tags: [Districts]
 *     responses:
 *       200:
 *         description: A list of districts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/districts', districtsController.getDistricts);

module.exports = router;
