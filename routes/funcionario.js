const express = require('express');

const funcionario_controller = require('../controllers/funcionarioController');

const route = express.Router();

route.get('/listagem', funcionario_controller.funcionario_lista);
route.get('/cadastrar', funcionario_controller.funcionario_cadastrar);
route.post('/inserir', funcionario_controller.funcionario_inserir);
route.post('/edicao', funcionario_controller.funcionario_editando);
route.post('/salvar_edicao', funcionario_controller.funcionario_salvar_edicao);
route.post('/deletar', funcionario_controller.funcionario_deletar);

module.exports = route;