import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';


export  const itemSchema = z.object({
    name: z.string().trim().min(2).max(50),
    description: z.string().trim().min(10).max(500),

    category: z.enum(['electronics', 'clothing', 'books', 'bags', 'toys', 'other']),

    type: z.enum(['lost','found']),

    location: z.string().trim().min(2).max(100),

    status: z.enum(['open', 'resolved']).default('open'),
});

export type ItemInput = z.infer<typeof itemSchema>;

const itemMongooseSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 500
        },
        category: {
            type: String,
            required: true,
            enum: ['electronics', 'clothing', 'books', 'bags', 'toys', 'other']
        },
        type: {
            type: String,
            required: true,
            enum: ['lost', 'found']
        },
        location: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 100
        },
        status: {
            type: String,
            required: true,
            enum: ['open', 'resolved'],
            default: 'open'
        }
    },
    {
        timestamps: true
    }
);

export const Item = mongoose.model('Item', itemMongooseSchema);