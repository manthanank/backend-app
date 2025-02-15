const express = require('express');
const router = express.Router();
const subscribersController = require('../controllers/subscribersController');

/**
 * @swagger
 * tags:
 *   name: Subscribers
 *   description: Subscriber management
 */

/**
 * @swagger
 * /api/subscribe:
 *   post:
 *     summary: Create a new subscriber
 *     tags: [Subscribers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: The created subscriber
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/subscribe', subscribersController.createSubscribers);

/**
 * @swagger
 * /api/subscribers:
 *   get:
 *     summary: Get all subscribers
 *     tags: [Subscribers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: A list of subscribers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/subscribers', subscribersController.getSubscribers);

/**
 * @swagger
 * /api/subscribers/{id}:
 *   delete:
 *     summary: Delete a subscriber by ID
 *     tags: [Subscribers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The subscriber ID
 *     responses:
 *       200:
 *         description: The deleted subscriber
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/subscribers/:id', subscribersController.deleteSubscriber);

/**
 * @swagger
 * /api/unsubscribe:
 *   post:
 *     summary: Unsubscribe an email
 *     tags: [Subscribers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Unsubscribed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/unsubscribe', subscribersController.unsubscribe);

module.exports = router;
