const express = require('express');

const controller = require('../controllers/funcionarioController');

const route = express.Router();

route.use(function timeLog(req, res, next) {
  if (req.session.logado) {
    next();
  } else {
    res.redirect('/usuario/login');
  }
});

route.get('/listagem', controller.funcionario_lista);
route.get('/cadastrar', controller.funcionario_cadastrar);
route.post('/inserir', controller.funcionario_inserir);
route.post('/edicao', controller.funcionario_editando);
route.post('/salvar_edicao', controller.funcionario_salvar_edicao);
route.post('/deletar', controller.funcionario_deletar);

module.exports = route;