const express = require('express');

const usuario_controller = require('../controllers/usuarioController');

const route = express.Router();

route.get('/cadastrar', usuario_controller.usuario_cadastrar);
route.get('/login', usuario_controller.usuario_login);
route.get('/inicio', usuario_controller.usuario_inicio);
route.get('/sair', usuario_controller.usuario_sair);
route.post('/inserir', usuario_controller.usuario_inserir);
route.post('/verifica', usuario_controller.usuario_verifica);

module.exports = route;