const { text } = require("body-parser");
const { Sequelize } = require('sequelize');
const sequelize = require('../database/mysql');
const Usuario = require("../models/usuario");
const asyncHandler = require("express-async-handler");

exports.usuario_inicio = asyncHandler(async (req, res, next) => {
    await Usuario.sync();
    res.render('usuario/inicio');
});

exports.usuario_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('usuario/cadastro');
});

exports.usuario_login = asyncHandler(async (req, res, next) => {
    res.render('usuario/login');
});

exports.usuario_inserir = asyncHandler(async (req, res, next) => {
    await Usuario.sync();

    try {
        const { nome, senha } = req.body;
        if (nome && senha) {
            const usuario = await Usuario.create(req.body);
        } else {
            console.log('Erro ao inserir usuario');
        }
    } catch (error) {
        console.error('Erro ao inserir usuario:', error);
    }
});

exports.usuario_verifica = asyncHandler(async (req, res, next) => {
    await Usuario.sync();

    try {
        const { nome, senha } = req.body;
        if (nome && senha) {
            const usuario = await Usuario.findOne({ where: { nome: nome, senha: senha } });
            console.log(usuario.dataValues.nome);
            if (usuario.dataValues) {
                console.log('Usuário encontrado');
                res.redirect('/usuario/inicio'), usuario.dataValues.nome;
            } else {
                console.log('Usuário não encontrado');
                res.redirect('/');
            }
        }
    } catch (error) {
        console.error('Erro ao buscar usuario:', error);
        res.redirect('/');
    }
});
