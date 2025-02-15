const express = require('express');
const router = express.Router();
const trendingReposController = require('../controllers/trendingReposController');

/**
 * @swagger
 * tags:
 *   name: OSSInsight
 *   description: OSS Insight API endpoints
 */

/**
 * @swagger
 * /api/trending-repos:
 *   get:
 *     summary: Get trending repositories
 *     tags: [OSSInsight]
 *     parameters:
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Programming language to filter by
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [past_day, past_week, past_month]
 *         description: Time period to filter by
 *     responses:
 *       200:
 *         description: A list of trending repositories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/trending-repos', trendingReposController.getTrendingRepos);

module.exports = router;
