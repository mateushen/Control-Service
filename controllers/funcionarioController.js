const { text } = require("body-parser");
const Funcionario = require("../models/funcionario");
const asyncHandler = require("express-async-handler");

exports.funcionario_lista = asyncHandler(async (req, res, next) => {
    await Funcionario.sync();
    res.render('/funcionarios/listagem', { funcionario: await Funcionario.findAll() });
});

exports.funcionario_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('/funcionarios/cadastrar');
});

exports.funcionario_editando = asyncHandler(async (req, res, next) => {
    await Funcionario.sync();
    const funcionario = await Funcionario.findByPk(req.body.id);

    if (funcionario) {
        res.render('/funcionarios/edicao', { funcionario: funcionario.dataValues });
    } else {
        res.render('/funcionarios/listagem');
    }
});

exports.funcionario_inserir = asyncHandler(async (req, res, next) => {
    await Funcionario.sync();
    const { nome, valorhora } = req.body;

    try {
        if (nome && valorhora) {
            const funcionario = await Funcionario.create(req.body);
            res.redirect('/listagem');
        }
    } catch (error) {
        console.error('Erro ao inserir funcionario:', error);
        res.status(500).json({ error: 'Erro ao inserir funcionario' });
    }
});

exports.funcionario_deletar = asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const funcionario = await Funcionario.findByPk(id);

    try {
        if (funcionario) {
            await Funcionario.destroy({ where: { id } });
            res.redirect('/listagem');
        }
    } catch (error) {
        console.error('Erro ao deletar funcionario:', error);
        res.status(500).json({ error: 'Erro ao deletar funcionario' });
    }
});

exports.funcionario_salvar_edicao = asyncHandler(async (req, res, next) => {
    const { id, nome, valorhora } = req.body;

    try {
        if (id && nome && valorhora) {
            await Funcionario.update({ nome, valorhora }, { where: { id } })
            res.redirect('/funcionarios/listagem');
        }
    } catch (error) {
        console.error('Erro ao editar funcionario:', error);
        res.status(500).json({ error: 'Erro ao editar funcionario' });
    }
});