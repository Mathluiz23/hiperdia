export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  import { db } from '../config/database';
  
  export const getAllUsers = async (): Promise<User[]> => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows as User[];
  };
  