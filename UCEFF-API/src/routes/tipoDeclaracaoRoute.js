import TipoDeclaracao from '../controllers/tipoDeclaracaoController';

export default (app) => {
  app.post('/tipo-declaracao/persist', TipoDeclaracao.persist);
  app.post('/tipo-declaracao/persist/:id', TipoDeclaracao.persist);
  app.post('/tipo-declaracao/destroy/:id', TipoDeclaracao.destroy);
  app.get('/tipo-declaracao', TipoDeclaracao.get);
  app.get('/tipo-declaracao/:id', TipoDeclaracao.get);
};
