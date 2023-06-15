const { text } = require("body-parser");
const Obra = require("../models/obra");
const asyncHandler = require("express-async-handler");

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
    console.log(obra);

    if (obra) {
        res.render('obra/edicao', { obra: obra.dataValues });
    } else {
        res.render('obra/listagem');
    }
});

exports.obra_inserir = asyncHandler(async (req, res, next) => {
    await Obra.sync();
    const { endereco, valorservico, descricao } = req.body;

    try {
        if ( endereco && valorservico && descricao) {
            const obra = await Obra.create(req.body);
            res.redirect('obra/listagem');
        }
    }catch (error){
        console.error('Erro ao inserir obra:', error);
        res.status(500).json({ error: 'Erro ao inserir obra' });
    }
});

exports.obra_deletar = asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const obra = await Obra.findByPk(id);

    try {
        if (obra) {
            await obra.destroy({ where: { id } });
            res.redirect('obra/listagem');
        }
    } catch (error) {
        console.error('Erro ao deletar obra:', error);
        res.status(500).json({ error: 'Erro ao deletar obra' });
    }
});

exports.obra_salvar_edicao = asyncHandler(async (req, res, next) => {
    const { id, endereco, valorservico, descricao } = req.body;

    try {
        if (id && endereco && valorservico) {
            await Obra.update({ endereco, valorservico, descricao }, { where: { id } })
            res.redirect('obra/listagem');
        }
    } catch (error) {
        console.error('Erro ao editar obra:', error);
        res.status(500).json({ error: 'Erro ao editar obra' });
    }
});