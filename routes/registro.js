const express = require('express');

const registro_controller = require('../controllers/registroController');

const route = express.Router();

route.get('/listagem', registro_controller.registro_lista);
route.get('/cadastrar', registro_controller.registro_cadastrar);
route.post('/inserir', registro_controller.registro_inserir);
route.post('/edicao', registro_controller.registro_editando);
route.post('/salvar_edicao', registro_controller.registro_salvar_edicao);
route.post('/deletar', registro_controller.registro_deletar);

module.exports = route;