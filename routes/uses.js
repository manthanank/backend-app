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
 *     summary: Get all uses
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
router.get('/uses', usesController.getAllUses);

/**
 * @swagger
 * /api/uses/{id}:
 *   get:
 *     summary: Get use by ID
 *     tags: [Uses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The use ID
 *     responses:
 *       200:
 *         description: A use object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/uses/:id', usesController.getUseById);

/**
 * @swagger
 * /api/uses:
 *   post:
 *     summary: Create a new use
 *     tags: [Uses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: The created use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/uses', usesController.createUse);

/**
 * @swagger
 * /api/uses/{id}:
 *   put:
 *     summary: Update a use
 *     tags: [Uses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The use ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: The updated use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put('/uses/:id', usesController.updateUse);

/**
 * @swagger
 * /api/uses/{id}:
 *   delete:
 *     summary: Delete a use
 *     tags: [Uses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The use ID
 *     responses:
 *       200:
 *         description: The deleted use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete('/uses/:id', usesController.deleteUse);

module.exports = router;