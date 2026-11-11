import {CarModel, ICar} from '../models/cars'
import { HydratedDocument } from 'mongoose' ;
import { NotFoundError } from "../../src/apperrors/apperrors";

export class CarService {
    async getAllCars(): Promise<ICar[]> {
        return await CarModel.find().lean();
    }

    async getCarById(id: string): Promise<ICar> {
        const car = await CarModel.findById(id).lean();
        if (!car) {
            throw new NotFoundError(`Car with ID ${id}`);
        }
        return car;
    }
    async createCar(carData: ICar): Promise<HydratedDocument<ICar>> {
        const car = new CarModel(carData);
        return await car.save();
    }

  async updateCar(id: string, carData: Partial<ICar>): Promise<ICar> {
        const updatedcar = await CarModel.findByIdAndUpdate(id, carData, { returnDocument: 'after' }).lean();
        
        if (!updatedcar) {
            throw new NotFoundError(`Car with ID ${id}`);
        }
        return updatedcar;
    }

  async deleteCar(id: string): Promise<ICar> {
        const deletedcar = await CarModel.findByIdAndDelete(id).lean();
        if (!deletedcar) {
            throw new NotFoundError(`Car with ID ${id}`);
        }
        return deletedcar;
    }

}