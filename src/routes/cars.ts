import { Router } from 'express';
import { CarsController } from '../controllers/cars';
import { authenticateKey } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { createCarZSchema } from '../models/cars';

const router = Router();
const carsController = new CarsController();

router.get('/', carsController.getCars);
router.get('/:id', carsController.getCarById);

router.post('/',authenticateKey,validate(createCarZSchema), carsController.createCar);

router.put('/:id', carsController.updateCar);

router.delete('/:id', carsController.deleteCar);

export default router;
