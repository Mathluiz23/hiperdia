import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';  // Importando o cors
import medicaoRoutes from './routes/medicaoRoutes';
import sequelize from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitando o CORS para todas as rotas
app.use(cors());

// Parsing do JSON nas requisições
app.use(bodyParser.json());

// Definindo as rotas da API
app.use('/api', medicaoRoutes);

// Sincronizar o banco de dados
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.error('Erro ao sincronizar o banco de dados:', error);
});

