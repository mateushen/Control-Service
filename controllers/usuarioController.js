const { text } = require("body-parser");
const { Sequelize } = require('sequelize');
const sequelize = require('../database/mysql');
const Usuario = require("../models/usuario");
const asyncHandler = require("express-async-handler");

exports.usuario_lista = asyncHandler(async (req, res, next) => {
    await Usuario.sync();
    res.render('usuario/listagem', { usuario: await Usuario.findAll() });
});

exports.usuario_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('usuario/cadastro');
});

exports.usuario_inserir = asyncHandler(async (req, res, next) => {
    await Usuario.sync();

    try {
        const { nome, senha } = req.body;
        if (nome && senha) {
            const usuario = await Usuario.create(req.body);
        }
    } catch (error) {
        console.error('Erro ao inserir usuario:', error);
        res.status(500).json({ error: 'Erro ao inserir usuario' });
    }
});