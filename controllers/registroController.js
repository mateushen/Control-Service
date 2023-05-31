const { text } = require("body-parser");
const Registro = require("../models/registro");
const asyncHandler = require("express-async-handler");

exports.registro_lista = asyncHandler(async (req, res, next) => {
    await Registro.sync();
    res.render('/registros/listagem', { registro: await Registro.findAll() });
});

exports.registro_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('/registros/cadastrar');
});

exports.registro_editando = asyncHandler(async (req, res, next) => {
    await Registro.sync();
    const registro = await Registro.findByPk(req.body.id);

    if (registro) {
        res.render('/registros/edicao', { registro: registro.dataValues });
    } else {
        res.render('/registros/listagem');
    }
});

exports.registro_inserir = asyncHandler(async (req, res, next) => {
    await Registro.sync();
    const { horas, data, idFuncionario, idObra } = req.body;

    try {
        if (horas && data && idFuncionario && idObra) {
            const registro = await Registro.create(req.body);
            res.redirect('/registros/listagem');
        }
    } catch (error) {
        console.error('Erro ao inserir registro:', error);
        res.status(500).json({ error: 'Erro ao inserir registro' });
    }
});

exports.registro_deletar = asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const registro = await Registro.findByPk(id);

    try {
        if (registro) {
            await Registro.destroy({ where: { id } });
            res.redirect('/registros/listagem');
        }
    } catch (error) {
        console.error('Erro ao deletar registro:', error);
        res.status(500).json({ error: 'Erro ao deletar registro' });
    }
});

exports.registro_salvar_edicao = asyncHandler(async (req, res, next) => {
    const { id, horas, data, idFuncionario, idObra } = req.body;

    try {
        if (id && horas && data && idFuncionario && idObra) {
            await Registro.update({ descricao, valor, idObra }, { where: { id } })
            res.redirect('/registros/listagem');
        }
    } catch (error) {
        console.error('Erro ao editar registro:', error);
        res.status(500).json({ error: 'Erro ao editar registro' });
    }
});