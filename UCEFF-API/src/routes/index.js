import AlunoRoute from './alunoRoute';
import PedidoDeclaracaoRoute from './pedidoDeclaracaoRoute';
import TipoDeclaracaoRoute from './tipoDeclaracaoRoute';

function Routes(app) {
  AlunoRoute(app);
  PedidoDeclaracaoRoute(app);
  TipoDeclaracaoRoute(app);
}

export default Routes;
