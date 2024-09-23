import { Router } from 'express';
import { getUsers } from '../controllers/userController';

const router = Router();

// Rota para buscar todos os usuários
router.get('/users', getUsers);

export default router;
