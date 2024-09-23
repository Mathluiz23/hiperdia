import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Definir rotas
app.use('/api', userRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
