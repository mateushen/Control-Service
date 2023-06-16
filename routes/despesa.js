const express = require('express');

const despesa_controller = require('../controllers/despesaController');

const route = express.Router();

route.get('/listagem', despesa_controller.despesa_lista);
route.get('/cadastrar', despesa_controller.despesa_cadastrar);
route.post('/inserir', despesa_controller.despesa_inserir);
route.post('/edicao', despesa_controller.despesa_editando);
route.post('/salvar_edicao', despesa_controller.despesa_salvar_edicao);
route.post('/deletar', despesa_controller.despesa_deletar);

module.exports = route;