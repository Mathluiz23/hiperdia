import { Router } from 'express';
import { getUsers, createUser } from '../controllers/userController';

const router = Router();

// Rota para buscar todos os usuários
router.get('/users', getUsers);
router.post('/users', createUser);


export default router;
