const express = require('express');

const despesa_controller = require('../controllers/despesaController');

const route = express.Router();

route.use(function timeLog(req, res, next) {
    if(req.session.logado){
      next();
    } else {
      res.redirect('/usuario/login');
    }
  });

route.get('/listagem', despesa_controller.despesa_lista);
route.get('/cadastrar', despesa_controller.despesa_cadastrar);
route.post('/inserir', despesa_controller.despesa_inserir);
route.post('/deletar', despesa_controller.despesa_deletar);

module.exports = route;