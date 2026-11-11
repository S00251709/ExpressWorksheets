import { Router } from 'express';
import { CarsController } from '../controllers/cars';
import { authenticateKey } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createCarZSchema, updateCarZSchema, carParamsSchema } from '../models/cars';

const router = Router();
const carsController = new CarsController();

router.get('/', carsController.getCars);
router.get('/:id',validate(carParamsSchema), carsController.getCarById);

router.post('/',authenticateKey,validate(createCarZSchema), carsController.createCar);

router.put('/:id',validate(carParamsSchema), validate(updateCarZSchema), carsController.updateCar);

router.delete('/:id', validate(carParamsSchema), carsController.deleteCar);

export default router;
