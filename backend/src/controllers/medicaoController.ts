import { Request, Response } from 'express';
import { MedicaoService } from '../service/medicaoService';
import sequelize from '../config/database';

export const MedicaoController = {
  salvarMedicoes: async (req: Request, res: Response) => {
    const { usuario, medicoes } = req.body;

    if (!usuario || typeof usuario.nome !== 'string' || typeof usuario.idade !== 'string' || typeof usuario.medicamentos !== 'string') {
      return res.status(400).json({ message: 'Dados de usuário inválidos.' });
    }

    if (!medicoes || !Array.isArray(medicoes) || medicoes.length === 0) {
      return res.status(400).json({ message: 'Lista de medições inválida ou vazia.' });
    }

    for (const medicao of medicoes) {
      if (!medicao.data || !medicao.horario || !medicao.periodo || !medicao.pressaoSistolica || !medicao.pressaoDiastolica) {
        return res.status(400).json({ message: 'Dados de medição inválidos.' });
      }
    }

    let transaction;
    try {
      transaction = await sequelize.transaction();

      for (const medicao of medicoes) {
        await MedicaoService.criarMedicao({
          data: medicao.data,
          horario: medicao.horario,
          pressaoSistolica: medicao.pressaoSistolica,
          pressaoDiastolica: medicao.pressaoDiastolica,
          periodo: medicao.periodo,
        }, transaction);
      }
      await transaction.commit();
      res.status(201).json({ message: 'Dados salvos com sucesso' });

    } catch (error) {
      if (transaction) await transaction.rollback();

      if (error instanceof Error) {
        if (error.message.includes('Medição duplicada')) {
          return res.status(409).json({ message: 'Medição duplicada: Já existe uma medição com esses dados.' });
        }
        return res.status(500).json({ message: 'Erro ao salvar os dados', error: error.message });
      }
      res.status(500).json({ message: 'Erro desconhecido ao salvar os dados' });
    }
  },

  buscarMedicoes: async (req: Request, res: Response) => {
    const { mes, ano } = req.query;

    if (!mes || !ano) {
      return res.status(400).json({ message: 'Mês e ano são obrigatórios' });
    }

    try {
      const medicoes = await MedicaoService.buscarMedicoesPorMesEAno(Number(mes), Number(ano));
      res.status(200).json(medicoes);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: 'Erro ao buscar medições', error: error.message });
      } else {
        res.status(500).json({ message: 'Erro desconhecido' });
      }
    }
  }
};
