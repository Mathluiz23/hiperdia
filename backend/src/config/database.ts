import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Criação e exportação da instância do Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'controle_pressao',   // Nome do banco de dados
  process.env.DB_USER || 'root',         // Usuário do banco
  process.env.DB_PASSWORD || '',         // Senha do banco
  {
    host: process.env.DB_HOST || 'localhost',  // Host do banco
    dialect: 'mysql',                          // Dialeto do banco (MySQL)
  }
);

// Testando a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
