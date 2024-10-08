import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

// Tornar o campo 'id' opcional na criação de uma nova medição
interface MedicaoAttributes {
  id: number;
  data: Date;
  horario: string;
  pressaoSistolica: number;
  pressaoDiastolica: number;
  periodo: string;
}

// Aqui estamos especificando que o 'id' será opcional na criação
interface MedicaoCreationAttributes extends Optional<MedicaoAttributes, 'id'> {}

export class Medicao extends Model<MedicaoAttributes, MedicaoCreationAttributes> implements MedicaoAttributes {
  public id!: number;
  public data!: Date;
  public horario!: string;
  public pressaoSistolica!: number;
  public pressaoDiastolica!: number;
  public periodo!: string;
}

Medicao.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pressaoSistolica: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pressaoDiastolica: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  periodo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'medicoes',
  timestamps: false
});
