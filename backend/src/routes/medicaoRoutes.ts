import { Router } from 'express';
import { MedicaoController } from '../controllers/medicaoController';

const router = Router();

router.post('/medicoes', MedicaoController.salvarMedicoes);
// router.get('/medicoes', MedicaoController.buscarMedicoes);

export default router;


