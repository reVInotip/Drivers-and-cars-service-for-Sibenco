import express from 'express'
import * as driverController from '../controllers/driver.controller';

const router = express.Router();

router.post('/', driverController.CreateDriver);
router.get('/all', driverController.GetAllDrivers);
router.delete('/:id', driverController.DeleteDriver);
router.patch('/:id', driverController.PatchDriver);
router.get('/:id', driverController.GetDriverById);
router.get('/', driverController.GetDriversByParams);

export default router;