const express = require('express');

const controller = require('../controllers/pagamentoController');

const route = express.Router();

route.use(function timeLog(req, res, next) {
  if (req.session.logado) {
    next();
  } else {
    res.redirect('/usuario/login');
  }
});

route.get('/listagem', controller.pagamento_lista);
route.get('/cadastrar', controller.pagamento_cadastrar);
route.post('/inserir', controller.pagamento_inserir);
route.post('/deletar', controller.pagamento_deletar);

module.exports = route;