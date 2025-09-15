import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const Aluno = sequelize.define(
  'aluno',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(75),
      allowNull: false,
    },
    dataNascimento: {
      field: 'data_nascimento',
      type: DataTypes.DATE,
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING(14),
    },
  },

  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

export default Aluno;
