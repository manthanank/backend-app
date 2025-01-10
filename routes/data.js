const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Data management
 */

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Get all data
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: A list of data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/data", dataController.getData);

/**
 * @swagger
 * /api/data:
 *   post:
 *     summary: Create a new data entry
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: The created data entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/data", dataController.createData);

/**
 * @swagger
 * /api/data/{id}:
 *   put:
 *     summary: Update a data entry
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The data ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: The updated data entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put("/data/:id", dataController.updateData);

/**
 * @swagger
 * /api/data/{id}:
 *   delete:
 *     summary: Delete a data entry
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The data ID
 *     responses:
 *       200:
 *         description: The deleted data entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete("/data/:id", dataController.deleteData);

module.exports = router;