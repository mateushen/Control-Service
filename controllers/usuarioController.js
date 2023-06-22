const { text } = require("body-parser");
const { Sequelize } = require('sequelize');
const sequelize = require('../database/mysql');
const Usuario = require("../models/usuario");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');

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
            const senha_crip = await bcrypt.hash(senha, 10);
            console.log(senha_crip);
            const usuario = await Usuario.create({ nome: nome, senha: senha_crip });
            res.redirect('/');
        } else {
            console.log('Erro ao inserir usuario');
            res.redirect('/');
        }
    } catch (error) {
        console.error('Erro ao inserir usuario:', error);
        res.redirect('/');
    }
});

exports.usuario_verifica = asyncHandler(async (req, res, next) => {
    await Usuario.sync();

    try {
        const { nome, senha } = req.body;
        const usuario = await Usuario.findOne({ where: { nome: nome } });
        if (usuario) {
            const valida = await bcrypt.compare(senha, usuario.senha);

            if (valida && usuario.dataValues.nome) {
                console.log('Usuário encontrado');
                res.redirect('/usuario/inicio');
                req.session.logado = true;
                req.session.nome = usuario.dataValues.nome;
            } else {
                console.log('Usuário não encontrado');
                res.redirect('/');
            }
        } else {
            console.log('Usuário não encontrado');
            res.redirect('/');
        }
    } catch (error) {
        console.error('Erro ao buscar usuario:', error);
        alert('Usuário não encontrado!');
        res.redirect('/');
    }
});
