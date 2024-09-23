import { Request, Response } from 'express';
import { getAllUsers } from '../models/userModel';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter usuários' });
  }
};
