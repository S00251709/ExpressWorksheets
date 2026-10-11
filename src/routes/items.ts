import {Router} from 'express';
import { ItemController } from '../controllers/items';
import { validate} from '../middleware/validate.middleware';
import { itemSchema } from '../models/items';

const router = Router();
const itemController = new ItemController();

/**
 * @openapi
 * /api/v1/items:
 *   get:
 *     summary: Retrieve all lost and found items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Internal server error
 *
 *   post:
 *     summary: Report a lost or found item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Invalid item data
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * /api/v1/items/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: MongoDB ObjectId of the item
 *       schema:
 *         type: string
 *         pattern: '^[a-fA-F0-9]{24}$'
 *
 *   get:
 *     summary: Retrieve an item by ID
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Invalid item ID
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update an existing item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Invalid ID or item data
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete an existing item
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       400:
 *         description: Invalid item ID
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */

// Define routes for item operations

// Get all items
router.get('/', (req, res) => 
    itemController.getAllItems(req, res));
// Get item by ID
router.get('/:id', (req, res) => 
    itemController.getItemById(req, res));
// Create a new item
router.post('/', validate(itemSchema), (req, res) => 
    itemController.createItem(req, res));
// Update an existing item
router.put('/:id', validate(itemSchema), (req, res) => 
    itemController.updateItem(req, res));
// Delete an item
router.delete('/:id', (req, res) => 
    itemController.deleteItem(req, res));

export default router;