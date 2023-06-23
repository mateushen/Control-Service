const express = require('express');

const controller = require('../controllers/usuarioController');

const route = express.Router();

route.get('/cadastrar', controller.usuario_cadastrar);
route.get('/login', controller.usuario_login);
route.get('/inicio', controller.usuario_inicio);
route.get('/sair', controller.usuario_sair);
route.post('/inserir', controller.usuario_inserir);
route.post('/verifica', controller.usuario_verifica);

module.exports = route;