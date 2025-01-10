const express = require("express");
const router = express.Router();
const districtsController = require("../controllers/districtsController");

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
router.get("/districts", districtsController.getDistricts);

/**
 * @swagger
 * /api/districts:
 *   post:
 *     summary: Create a new district
 *     tags: [Districts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: The created district
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/districts", districtsController.createDistrict);

/**
 * @swagger
 * /api/districts/{id}:
 *   put:
 *     summary: Update a district
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The district ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: The updated district
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.put("/districts/:id", districtsController.updateDistrict);

/**
 * @swagger
 * /api/districts/{id}:
 *   delete:
 *     summary: Delete a district
 *     tags: [Districts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The district ID
 *     responses:
 *       200:
 *         description: The deleted district
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.delete("/districts/:id", districtsController.deleteDistrict);

module.exports = router;