const { text } = require("body-parser");
const Despesa = require("../models/despesa");
const asyncHandler = require("express-async-handler");

exports.despesa_lista = asyncHandler(async (req, res, next) => {
    await Despesa.sync();
    res.render('despesa/listagem', { despesa: await Despesa.findAll() });
});

exports.despesa_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('despesa/cadastro');
});

exports.despesa_editando = asyncHandler(async (req, res, next) => {
    await Despesa.sync();
    const despesa = await Despesa.findByPk(req.body.id);

    if (despesa) {
        res.render('despesa/edicao', { despesa: despesa.dataValues });
    } else {
        res.render('despesa/listagem');
    }
});

exports.despesa_inserir = asyncHandler(async (req, res, next) => {
    await Despesa.sync();
    const { descricao, valor, idObra } = req.body;

    try {
        if ( descricao && valor && idObra) {
            const despesa = await Despesa.create(req.body);
            res.redirect('despesa/listagem');
        }
    }catch (error){
        console.error('Erro ao inserir despesa:', error);
        res.status(500).json({ error: 'Erro ao inserir despesa' });
    }
});

exports.despesa_deletar = asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const despesa = await Despesa.findByPk(id);

    try {
        if (despesa) {
            await despesa.destroy({ where: { id } });
            res.redirect('despesa/listagem');
        }
    } catch (error) {
        console.error('Erro ao deletar despesa:', error);
        res.status(500).json({ error: 'Erro ao deletar despesa' });
    }
});

exports.despesa_salvar_edicao = asyncHandler(async (req, res, next) => {
    const { id, descricao, valor, idObra } = req.body;

    try {
        if (id && descricao && valor && idObra) {
            await Despesa.update({ descricao, valor, idObra }, { where: { id } })
            res.redirect('despesa/listagem');
        }
    } catch (error) {
        console.error('Erro ao editar despesa:', error);
        res.status(500).json({ error: 'Erro ao editar despesa' });
    }
});