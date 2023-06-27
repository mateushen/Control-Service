const { text } = require("body-parser");
const asyncHandler = require("express-async-handler");
const Despesa = require("../models/despesa");
const Obra = require("../models/obra");

exports.despesa_cadastrar = asyncHandler(async (req, res, next) => {
    await Obra.sync();
    res.render('despesa/cadastro', { obra: await Obra.findAll() });
});

exports.despesa_inserir = asyncHandler(async (req, res, next) => {
    await Despesa.sync();

    try {
        const { descricao, valordespesa, idObra } = req.body;
        if (descricao && valordespesa && idObra) {
            const despesa = await Despesa.create(req.body);
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

exports.despesa_funcionario = asyncHandler(async (req, res, next) => {
    await Despesa.sync();

    try {
        const { descricao, valordespesa, idObra } = req.body;
        if (descricao && valordespesa && idObra) {
            const despesa = await Despesa.create(req.body);
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

exports.despesa_deletar = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        const despesa = await Despesa.findByPk(id);
        if (despesa) {
            await despesa.destroy({ where: { id } });
            res.redirect('/obra/listagem');
        } else {
            console.log('Erro ao deletar despesa');
        }
    } catch (error) {
        console.error('Erro ao deletar despesa:', error);
    }
});