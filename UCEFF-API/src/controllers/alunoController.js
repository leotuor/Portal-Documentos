import Aluno from '../models/AlunoModel';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Aluno.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await Aluno.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
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
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const create = async (dados, res) => {
  const {
    nome,
    dataNascimento,
    matricula,
  } = dados;

  const response = await Aluno.create({
    nome,
    dataNascimento,
    matricula,
  });

  return res.status(200).send({
    type: 'success',
    message: 'Cadastro realizado com sucesso',
    data: response,
  });
};

const update = async (id, dados, res) => {
  const response = await Aluno.findOne({ where: { id } });

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

const generateAluno = async (req, res) => {
  try {
    const url = 'https://www.4devs.com.br/ferramentas_online.php';
    const body = new URLSearchParams({
      acao: 'gerar_pessoa',
      sexo: 'H',
      pontuacao: 'N',
      idade: '0',
      cep_estado: '',
      txt_qtde: '1',
      cep_cidade: '',
    });

    const pessoas = await fetch(url, {
      method: 'POST',
      body,
    });
    const data = await pessoas.text();
    const pessoa = JSON.parse(data)[0];

    const { nome, data_nasc: dataSemFormat } = pessoa;
    const [day, month, year] = dataSemFormat.split('/');
    const dataNascimento = `${year}-${month}-${day}`;

    const matriculaGerada = Math.floor(Math.random() * 1e14).toString().padStart(14, '0');

    return await create({ nome, dataNascimento, matricula: matriculaGerada }, res);
  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'Erro ao gerar dados do aluno',
      error: error.message,
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

    const response = await Aluno.findOne({ where: { id } });

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
  persist,
  destroy,
  generateAluno,
};
