import { Request, Response } from 'express';
import { getAllUsers } from '../models/userModel';
import { db } from '../config/database';


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter usuários' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({ message: 'Usuário criado com sucesso', userId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
};
