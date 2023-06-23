const express = require('express');

const controller = require('../controllers/obraController');

const route = express.Router();

route.use(function timeLog(req, res, next) {
  if (req.session.logado) {
    next();
  } else {
    res.redirect('/usuario/login');
  }
});

route.get('/listagem', controller.obra_lista);
route.get('/cadastrar', controller.obra_cadastrar);
route.post('/inserir', controller.obra_inserir);
route.post('/edicao', controller.obra_editando);
route.post('/salvar_edicao', controller.obra_salvar_edicao);
route.post('/deletar', controller.obra_deletar);
route.post('/despesas', controller.obra_despesas);

module.exports = route;