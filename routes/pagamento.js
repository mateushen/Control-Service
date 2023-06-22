const express = require('express');

const pagamento_controller = require('../controllers/pagamentoController');

const route = express.Router();

route.use(function timeLog(req, res, next) {
    if (req.session.logado) {
      next();
    } else {
      res.redirect('/usuario/login');
    }
  });

route.get('/listagem', pagamento_controller.pagamento_lista);
route.get('/cadastrar', pagamento_controller.pagamento_cadastrar);
route.post('/inserir', pagamento_controller.pagamento_inserir);
route.post('/deletar', pagamento_controller.pagamento_deletar);

module.exports = route;