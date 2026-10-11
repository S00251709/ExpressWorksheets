import {Router} from 'express';
import { ItemController } from '../controllers/items';
import { validate} from '../middleware/validate.middleware';
import { itemSchema } from '../models/items';

const router = Router();
const itemController = new ItemController();
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