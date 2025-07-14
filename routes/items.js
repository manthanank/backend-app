const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemsController');
const {
  validateItem,
  validateItemId,
  validateItemUpdate,
  validateItemQuery,
  validateTags
} = require('../middleware/validators');

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated item ID
 *         name:
 *           type: string
 *           description: The name of the item
 *           example: "Sample Item"
 *         description:
 *           type: string
 *           description: The description of the item
 *           example: "This is a sample item"
 *         price:
 *           type: number
 *           description: The price of the item
 *           example: 19.99
 *         quantity:
 *           type: number
 *           description: The quantity of the item
 *           example: 10
 *         isAvailable:
 *           type: boolean
 *           description: Availability status of the item
 *           example: true
 *         category:
 *           type: string
 *           description: The category of the item
 *           example: "electronics"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: The tags associated with the item
 *           example: ["premium", "new"]
 *         formattedPrice:
 *           type: string
 *           description: The formatted price with currency symbol
 *           example: "$19.99"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation date of the item
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update date of the item
 *     Pagination:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           description: Total number of records
 *         page:
 *           type: integer
 *           description: Current page
 *         limit:
 *           type: integer
 *           description: Items per page
 *         pages:
 *           type: integer
 *           description: Total number of pages
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "error"
 *         message:
 *           type: string
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *               message:
 *                 type: string
 */

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: The created item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Item'
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/items', validateItem, itemController.createItem);

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items with pagination and filtering
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "createdAt:desc"
 *         description: Sort field and direction (field:asc|desc)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *     responses:
 *       200:
 *         description: List of items with pagination info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 */
router.get('/items', validateItemQuery, itemController.getItems);

// Consolidated single statistics endpoint (removed duplicates above)
router.get('/items/stats', itemController.getItemStats);

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get an item by ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: The item data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 *       400:
 *         description: Invalid ID format
 */
router.get('/items/:id', validateItemId, itemController.getItemById);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The updated item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Item'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Item not found
 */
router.put('/items/:id', validateItemUpdate, itemController.updateItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Item deleted successfully"
 *       404:
 *         description: Item not found
 *       400:
 *         description: Invalid ID format
 *       500:
 *         description: Server error
 */
router.delete('/items/:id', validateItemId, itemController.deleteItem);

/**
 * @swagger
 * /items/{id}/tags:
 *   post:
 *     summary: Add tags to an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tags
 *             properties:
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of tags to add
 *                 example: ["premium", "sale", "featured"]
 *     responses:
 *       200:
 *         description: The updated item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Item'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Item not found
 */
router.post('/items/:id/tags', validateTags, itemController.addItemTags);

/**
 * @swagger
 * /items/{id}/tags:
 *   delete:
 *     summary: Remove tags from an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tags
 *             properties:
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of tags to remove
 *                 example: ["sale", "featured"]
 *     responses:
 *       200:
 *         description: The updated item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   $ref: '#/components/schemas/Item'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Item not found
 */
router.delete('/items/:id/tags', validateTags, itemController.removeItemTags);

module.exports = router;


