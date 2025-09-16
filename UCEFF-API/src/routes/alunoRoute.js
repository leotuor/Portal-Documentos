import Aluno from '../controllers/alunoController';

export default (app) => {
  app.post('/aluno/persist', Aluno.persist);
  app.post('/aluno/persist/:id', Aluno.persist);
  app.post('/aluno/destroy/:id', Aluno.destroy);
  app.get('/aluno', Aluno.get);
  app.get('/aluno/:id', Aluno.get);
  app.post('/aluno/generate', Aluno.generateAluno);
};
