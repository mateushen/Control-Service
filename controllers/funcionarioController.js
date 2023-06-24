const { text } = require("body-parser");
const Funcionario = require("../models/funcionario");
const asyncHandler = require("express-async-handler");

exports.funcionario_lista = asyncHandler(async (req, res, next) => {
    await Funcionario.sync();
    res.render('funcionario/listagem', { funcionario: await Funcionario.findAll() });
});

exports.funcionario_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('funcionario/cadastro');
});

exports.funcionario_editando = asyncHandler(async (req, res, next) => {
    await Funcionario.sync();
    const funcionario = await Funcionario.findByPk(req.body.id);

    if (funcionario) {
        res.render('funcionario/edicao', { funcionario: funcionario.dataValues });
    } else {
        res.render('funcionario/listagem');
    }
});

exports.funcionario_inserir = asyncHandler(async (req, res, next) => {
    await Funcionario.sync();
    
    try {
        const { nome, valorhora } = req.body;

        if (nome && valorhora) {
            const funcionario = await Funcionario.create(req.body);
            res.redirect('/funcionario/cadastrar');
        } else {
            console.log('Erro ao inserir funcionário');
        }
    } catch (error) {
        console.error('Erro ao inserir funcionário:', error);
    }
});

exports.funcionario_deletar = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        const funcionario = await Funcionario.findByPk(id);
        if (funcionario) {
            await Funcionario.destroy({ where: { id } });
            res.redirect('/funcionario/listagem');
        } else {
            console.log('Erro ao deletar funcionario');
        }
    } catch (error) {
        console.error('Erro ao deletar funcionario:', error);
    }
});

exports.funcionario_salvar_edicao = asyncHandler(async (req, res, next) => {
    try {
        const { id, nome, valorhora } = req.body;
        if (id && nome && valorhora) {
            await Funcionario.update({ nome, valorhora }, { where: { id } })
            res.redirect('/funcionario/listagem');
        } else {
            console.log('Erro ao editar funcionario');
        }
    } catch (error) {
        console.error('Erro ao editar funcionario:', error);
    }
});