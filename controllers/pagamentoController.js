const { text } = require("body-parser");
const { Sequelize } = require('sequelize');
const sequelize = require('../database/mysql');
const Pagamento = require("../models/pagamento");
const Funcionario = require("../models/funcionario");
const Obra = require("../models/obra");
const asyncHandler = require("express-async-handler");

exports.pagamento_lista = asyncHandler(async (req, res, next) => {
    await Pagamento.sync();
    await Funcionario.sync();
    await Obra.sync();

    sequelize.query('SELECT * FROM pagamento INNER JOIN obra ON pagamento.idObra = obra.id INNER JOIN funcionario On pagamento.idFuncionario = funcionario.id', {
        type: Sequelize.QueryTypes.SELECT,
    }).then((pagamento) => {
        res.render('pagamento/listagem', { pagamento: pagamento });
        console.log(pagamento);
    }).catch((error) => {
        console.error(error);
    });
});

exports.pagamento_cadastrar = asyncHandler(async (req, res, next) => {
    await Funcionario.sync();
    await Obra.sync();
    res.render('pagamento/cadastro', { funcionario: await Funcionario.findAll(), obra: await Obra.findAll() });
});

exports.pagamento_editando = asyncHandler(async (req, res, next) => {
    await Pagamento.sync();
    const pagamento = await Pagamento.findByPk(req.body.id);

    if (pagamento) {
        res.render('pagamento/edicao', { pagamento: pagamento.dataValues });
    } else {
        res.render('pagamento/listagem');
    }
});

exports.pagamento_inserir = asyncHandler(async (req, res, next) => {
    await Pagamento.sync();
    const { qtd_horas, data, idFuncionario, idObra } = req.body;

    try {
        if (qtd_horas && data && idFuncionario && idObra) {
            const pagamento = await Pagamento.create(req.body);
            res.redirect('/pagamento/listagem');
        }
    } catch (error) {
        console.error('Erro ao inserir pagamento:', error);
        res.status(500).json({ error: 'Erro ao inserir pagamento' });
    }
});

exports.pagamento_deletar = asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const pagamento = await Pagamento.findByPk(id);

    try {
        if (pagamento) {
            await Pagamento.destroy({ where: { id } });
            res.redirect('/pagamento/listagem');
        }
    } catch (error) {
        console.error('Erro ao deletar pagamento:', error);
        res.status(500).json({ error: 'Erro ao deletar pagamento' });
    }
});

exports.pagamento_salvar_edicao = asyncHandler(async (req, res, next) => {
    const { id, horas, data, idFuncionario, idObra } = req.body;

    try {
        if (id && horas && data && idFuncionario && idObra) {
            await Registro.update({ descricao, valor, idObra }, { where: { id } })
            res.redirect('/pagamento/listagem');
        }
    } catch (error) {
        console.error('Erro ao editar registro:', error);
        res.status(500).json({ error: 'Erro ao editar registro' });
    }
});