import express from 'express'
import * as carController from '../controllers/car.controller';

const router = express.Router();

router.post('/', carController.CreateCar);
router.get('/all', carController.GetAllCars);
router.delete('/:id', carController.DeleteCar);
router.patch('/:id', carController.PatchCar);
router.get('/:id', carController.GetCarById);
router.get('/', carController.GetCarsByParams);

export default router;