import {Item, ItemInput} from '../models/items';
import { HydratedDocument } from 'mongoose';

export class ItemService {
    async getAllItems() {
        return await Item.find().lean();
    }

    async getItemById(id: string) {
        return await Item.findById(id).lean();
    }

    async createItem(ItemData : ItemInput): Promise<HydratedDocument<ItemInput>> {
        const item = new Item(ItemData);
        return await item.save();
    }

    async updateItem(id: string, itemData: Partial<ItemInput>) {
        return await Item.findByIdAndUpdate(id, itemData, 
            {
                returnDocument: 'after',
                runValidators: true
            }).lean();
    }

    async deleteItem(id: string) {
        return await Item.findByIdAndDelete(id).lean();
    }

}