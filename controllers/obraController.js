const { text } = require("body-parser");
const { Sequelize } = require('sequelize');
const sequelize = require('../database/mysql');
const Obra = require("../models/obra");
const Despesa = require("../models/despesa");
const asyncHandler = require("express-async-handler");

exports.obra_despesas = asyncHandler(async (req, res, next) => {
    await Obra.sync();
    await Despesa.sync();

    sequelize.query(`SELECT * FROM obra INNER JOIN despesa ON obra.id = despesa.idObra WHERE obra.id = ${req.body.id} ORDER BY despesa.id`, {
        type: Sequelize.QueryTypes.SELECT,
    }).then((obra) => {
        if (obra.length > 0) {
            res.render('obra/despesas', { obra: obra });
        } else {
            res.redirect('/obra/listagem');
        }

    }).catch((error) => {
        console.error(error);
    });
});

exports.obra_lista = asyncHandler(async (req, res, next) => {
    await Obra.sync();
    res.render('obra/listagem', { obra: await Obra.findAll() });
});

exports.obra_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('obra/cadastro');
});

exports.obra_editando = asyncHandler(async (req, res, next) => {
    await Obra.sync();
    const obra = await Obra.findByPk(req.body.id);

    if (obra) {
        res.render('obra/edicao', { obra: obra.dataValues });
    } else {
        res.render('obra/listagem');
    }
});

exports.obra_inserir = asyncHandler(async (req, res, next) => {
    await Obra.sync();

    try {
        const { endereco, valorservico, descricao } = req.body;
        if (endereco && valorservico && descricao) {
            const obra = await Obra.create(req.body);
            res.status(200).json({
                status: 'ok',
                mensagem: 'Dados cadastrados!'
            });
        } else {
            res.status(500).json({
                status: 'error',
                mensagem: 'Erro ao cadastrar!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            mensagem: error
        });
    }
});

exports.obra_deletar = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        console.log(id);
        const obra = await Obra.findByPk(id);
        if (obra) {
            await obra.destroy({ where: { id } });
            res.status(200).json({
                status: 'ok',
                mensagem: 'Dados excluídos!'
            });
        } else {
            res.status(500).json({
                status: 'error',
                mensagem: 'Erro ao excluir!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            mensagem: error
        });
    }
});

exports.obra_salvar_edicao = asyncHandler(async (req, res, next) => {
    try {
        const { id, endereco, valorservico, descricao } = req.body;
        if (id && endereco && valorservico) {
            await Obra.update({ endereco, valorservico, descricao }, { where: { id } })
            res.status(200).json({
                status: 'ok',
                mensagem: 'Dados alterados!'
            });
        } else {
            res.status(500).json({
                status: 'error',
                mensagem: 'Erro ao alterar!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            mensagem: error
        });
    }
});