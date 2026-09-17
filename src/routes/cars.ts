import { Router } from 'express';
import { CarsController } from '../controllers/cars';

const router = Router();
const carsController = new CarsController();

router.get('/', carsController.getCars);

router.get('/:id', carsController.getCarById);
router.post('/', carsController.createCar);
router.put('/:id', carsController.updateCar);
router.delete('/:id', carsController.deleteCar);

export default router;
