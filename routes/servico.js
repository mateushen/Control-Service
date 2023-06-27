const express = require('express');

const controller = require('../controllers/servicoController');

const route = express.Router();

route.use(function timeLog(req, res, next) {
  if (req.session.logado) {
    next();
  } else {
    res.redirect('/usuario/login');
  }
});

route.get('/listagem', controller.servico_lista);
route.get('/cadastrar', controller.servico_cadastrar);
route.post('/inserir', controller.servico_inserir);
route.post('/deletar', controller.servico_deletar);

module.exports = route;