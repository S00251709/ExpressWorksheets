import {Request, Response} from 'express';
import mongoose from 'mongoose';
import { ItemService } from '../services/items';
import { itemSchema } from '../models/items';

const itemService = new ItemService();

export class ItemController {


    async getAllItems(_req: Request, res: Response) {
        try {
            const items = await itemService.getAllItems();
            return res.status(200).json(items);
        } catch (error) {
            return res.status(500).json({ 
                message: 'Error fetching items'
            });
        }
    }

    async getItemById(req: Request, res: Response) {
        try {
            const id = String(req.params.id);
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ 
                    message: 'Invalid item ID' 
                });
            }

            const item = await itemService.getItemById(id);

            if (!item) {
                return res.status(404).json({ 
                    message: 'Item not found' 
                });
            }

            return res.status(200).json(item);
        } catch (error) {
            return res.status(500).json({ 
                message: 'Error retrieving item'
            });
        }
    }

    async createItem(req:Request , res:Response){
        try {
            const validation = itemSchema.safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: validation.error.flatten()
                });
            }

            const item = await itemService.createItem(validation.data);

            return res.status(201).json(item);
        } catch (error) {
            return res.status(500).json({ 
                message: 'Error creating item'
            });
        }
    }

    async updateItem(req: Request, res: Response) {
        try {
            const id = String(req.params.id);
            if (!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({ 
                    message: 'Invalid item ID' 
                });
            }

            const validation = itemSchema.safeParse(req.body);

            if (!validation.success) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: validation.error.flatten()
                });
            }

            const item = await itemService.updateItem(id, validation.data);

            if (!item) {
                return res.status(404).json({ 
                    message: 'Item not found' 
                });
            }

            return res.status(200).json(item);
        } catch (error) {
            return res.status(500).json({ 
                message: 'Error updating item'
            });
        }
    }
    async deleteItem(req: Request, res: Response) {
        try {
            const id = String(req.params.id);

            if (!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({
                    message: 'Invalid item ID'
                });
            }
            
            const item = await itemService.deleteItem(id);

            if (!item) {
                return res.status(404).json({
                    message: 'Item not found'
                });
            }
            return res.status(200).json({
                message: 'Item deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error deleting item'
            });
        }
    }
} 