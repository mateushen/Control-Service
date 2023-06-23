const express = require('express');

const controller = require('../controllers/despesaController');

const route = express.Router();

route.use(function timeLog(req, res, next) {
  if (req.session.logado) {
    next();
  } else {
    res.redirect('/usuario/login');
  }
});

route.get('/listagem', controller.despesa_lista);
route.get('/cadastrar', controller.despesa_cadastrar);
route.post('/inserir', controller.despesa_inserir);
route.post('/deletar', controller.despesa_deletar);

module.exports = route;