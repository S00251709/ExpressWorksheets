import { Schema, model } from 'mongoose';
import { z } from 'zod';

export interface ICar {
  make: string;
  model: string;
  year?: number;
}

const carSchema = new Schema<ICar>(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, min: 1950 },
  },
  { timestamps: true }
);
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCarInput:
 *       type: object
 *       required:
 *         - make
 *         - model
 *       properties:
 *         make:
 *           type: string
 *           example: Peugeot
 *         model:
 *           type: string
 *           example: "207"
 *         year:
 *           type: integer
 *           example: 2011
 */
export const createCarZSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(1950).optional(),
});

export const updateCarZSchema = z.object({
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.number().min(1950).optional(),
});

export const CarModel = model<ICar>('Car', carSchema);
