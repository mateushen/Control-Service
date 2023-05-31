const express = require('express');

const usuario_controller = require('../controllers/usuarioController');

const route = express.Router();

route.get('/listagem', usuario_controller.usuario_lista);
route.get('/login', usuario_controller.usuario_login);
route.get('/cadastrar', usuario_controller.usuario_cadastrar);

module.exports = route;