import { Medicao } from '../models/Medicoes';
import sequelize from '../config/database';

export const MedicaoService = {
  criarMedicao: async (dados: {
    data: Date;
    horario: string;
    pressaoSistolica: number;
    pressaoDiastolica: number;
    periodo: string;
  }, transaction?: any) => {
    try {
      const medicaoExistente = await Medicao.findOne({
        where: {
          data: dados.data,
          horario: dados.horario,
          pressaoSistolica: dados.pressaoSistolica,
          pressaoDiastolica: dados.pressaoDiastolica,
          periodo: dados.periodo,
        },
      });

      if (medicaoExistente) {
        throw new Error('Medição duplicada: Já existe uma medição com esses dados no banco.');
      }

      const novaMedicao = await Medicao.create(dados, { transaction });
      return novaMedicao;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao criar a medição: ' + error.message);
      } else {
        throw new Error('Erro desconhecido ao criar a medição');
      }
    }
  },

  buscarMedicoesPorMesEAno: async (mes: number, ano: number) => {
    try {
      const medicoes = await Medicao.findAll({
        where: sequelize.literal(`MONTH(data) = ${mes} AND YEAR(data) = ${ano}`)
      });
      return medicoes;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao buscar as medições: ' + error.message);
      } else {
        throw new Error('Erro desconhecido ao buscar as medições');
      }
    }
  },
};
