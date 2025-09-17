import PedidoDeclaracao from '../models/PedidoDeclaracaoModel';
import Aluno from '../models/AlunoModel';
import TipoDeclaracao from '../models/TipoDeclaracaoModel';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await PedidoDeclaracao.findAll({
        PedidoDeclaracao: [['id', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await PedidoDeclaracao.findOne({ where: { id } });

    if (!response) {
      return res.status(404).send({
        type: 'error',
        message: `Nenhum registro com id ${id}`,
        data: [],
      });
    }

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: response,
    });
  } catch (error) {
    return res.status(501).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const getDetalhesPedidos = async (req, res) => {
  try {
    const response = await PedidoDeclaracao.findAll({
      include: [
        {
          model: Aluno,
          as: 'aluno',
          attributes: ['id', 'nome', 'matricula'],
        },
        {
          model: TipoDeclaracao,
          as: 'tipoDeclaracao',
          attributes: ['id', 'tipo'],
        },
      ],
      order: [['id', 'DESC']],
    });

    const responseFormatada = response.map((item) => {
      const itemData = item.toJSON();
      return {
        ...itemData,
        dataFormatada: new Date(itemData.created_at).toLocaleDateString('pt-BR'),
      };
    });

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: responseFormatada,
    });
  } catch (error) {
    return res.status(501).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const create = async (dados, res) => {
  const {
    idTipoDeclaracao,
    idAluno,
  } = dados;

  const response = await PedidoDeclaracao.create({
    idTipoDeclaracao,
    idAluno,
  });

  return res.status(200).send({
    type: 'success',
    message: 'Cadastro realizado com sucesso',
    data: response,
  });
};

const update = async (id, dados, res) => {
  const response = await PedidoDeclaracao.findOne({ where: { id } });

  if (!response) {
    return res.status(200).send({
      type: 'error',
      message: `Nenhum registro com id ${id} para atualizar`,
      data: [],
    });
  }

  Object.assign(response, dados);

  await response.save();
  return res.status(200).send({
    type: 'success',
    message: `Registro id ${id} atualizado com sucesso`,
    data: response,
  });
};

const persist = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      return await create(req.body, res);
    }

    return await update(id, req.body, res);
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        type: 'error',
        message: 'Informe um id para deletar o registro',
        data: [],
      });
    }

    const response = await PedidoDeclaracao.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id} para deletar`,
        data: [],
      });
    }

    await response.destroy();
    return res.status(200).send({
      type: 'success',
      message: `Registro id ${id} deletado com sucesso`,
      data: [],
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

export default {
  get,
  getDetalhesPedidos,
  persist,
  destroy,
};
