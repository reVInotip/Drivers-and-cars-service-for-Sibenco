import express from 'express'
import * as vangerController from '../controllers/vanger.controller';

const router = express.Router();

router.post('/', vangerController.CreateVanger);
router.get('/all', vangerController.GetAllVangers);
router.delete('/:id', vangerController.DeleteVanger);
router.patch('/:id', vangerController.PatchVanger);
router.get('/:id', vangerController.GetVangerById);

export default router