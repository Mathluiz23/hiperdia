import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carregar as variáveis de ambiente
dotenv.config();

// Criar uma pool de conexão com o MySQL
export const db = mysql.createPool({
  host: process.env.DB_HOST,       // Alterar no .env
  user: process.env.DB_USER,       // Alterar no .env
  password: process.env.DB_PASSWORD, // Alterar no .env
  database: process.env.DB_NAME    // Alterar no .env
});
