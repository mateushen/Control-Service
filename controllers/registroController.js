const { text } = require("body-parser");
const Despesa = require("../models/funcionario");
const asyncHandler = require("express-async-handler");

exports.despesa_lista = asyncHandler(async (req, res, next) => {
    await Registro.sync();
    res.render('/funcionarios/listagem', { despesa: await Registro.findAll() });
});

exports.despesa_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('/funcionarios/cadastrar');
});

exports.despesa_editando = asyncHandler(async (req, res, next) => {
    await Registro.sync();
    const registro = await Registro.findByPk(req.body.id);

    if (registro) {
        res.render('/funcionarios/edicao', { registro: registro.dataValues });
    } else {
        res.render('/funcionarios/listagem');
    }
});

exports.registro_inserir = asyncHandler(async (req, res, next) => {
    await Registro.sync();
    const { descricao, valor, idObra } = req.body;

    try {
        if ( descricao && valor && idObra) {
            const registro = await Registro.create(req.body);
            res.redirect('/funcionarios/listagem');
        }
    }catch (error){
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
            res.redirect('/funcionarios/listagem');
        }
    } catch (error) {
        console.error('Erro ao deletar registro:', error);
        res.status(500).json({ error: 'Erro ao deletar registro' });
    }
});

exports.registro_salvar_edicao = asyncHandler(async (req, res, next) => {
    const { id, descricao, valor, idObra } = req.body;

    try {
        if (id && descricao && valor && idObra) {
            await Registro.update({ descricao, valor, idObra }, { where: { id } })
            res.redirect('/funcionarios/listagem');
        }
    } catch (error) {
        console.error('Erro ao editar registro:', error);
        res.status(500).json({ error: 'Erro ao editar registro' });
    }
});