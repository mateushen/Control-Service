const express = require('express');

const obra_controller = require('../controllers/obraController');

const route = express.Router();

route.get('/listagem', obra_controller.obra_lista);
route.get('/cadastrar', obra_controller.obra_cadastrar);
route.post('/inserir', obra_controller.obra_inserir);
route.post('/edicao', obra_controller.obra_editando);
route.post('/salvar_edicao', obra_controller.obra_salvar_edicao);
route.post('/deletar', obra_controller.obra_deletar);
route.get('/despesas', obra_controller.obra_despesas);

module.exports = route;