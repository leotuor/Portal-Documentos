import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const TipoDeclaracao = sequelize.define(
  'tipo_declaracao',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },

  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default TipoDeclaracao;
