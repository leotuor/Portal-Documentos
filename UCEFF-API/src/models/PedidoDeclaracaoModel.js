import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Aluno from './AlunoModel';
import TipoDeclaracao from './TipoDeclaracaoModel';

const PedidoDeclaracao = sequelize.define(
  'pedidos_declaracoes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
PedidoDeclaracao.belongsTo(Aluno, {
  as: 'aluno',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_aluno',
    name: 'idAluno',
    allowNull: false,
  },
});

PedidoDeclaracao.belongsTo(TipoDeclaracao, {
  as: 'tipoDeclaracao',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_tipo_declaracao',
    name: 'idTipoDeclaracao',
    allowNull: false,
  },
});

export default PedidoDeclaracao;
