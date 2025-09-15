import PedidoDeclaracao from '../controllers/pedidoDeclaracaoController';

export default (app) => {
  app.post('/pedido-declaracao/persist/:id', PedidoDeclaracao.persist);
  app.post('/pedido-declaracao/persist', PedidoDeclaracao.persist);
  app.post('/pedido-declaracao/destroy/:id', PedidoDeclaracao.destroy);
  app.get('/pedido-declaracao', PedidoDeclaracao.get);
  app.get('/pedido-declaracao/:id', PedidoDeclaracao.get);
};
