const Noticia = require("../models/noticia");
const asyncHandler = require("express-async-handler");
const views = require('../views/views');

exports.noticia_lista = asyncHandler(async (req, res, next) => {
    await Noticia.sync();
    const noticias = await Noticia.findAll();
    const output = await views.render('noticias.twig', { noticias: noticias, logado: req.session.logado });
    res.end(output);
});

exports.noticia_compor = asyncHandler(async (req, res, next) => {
    const output = await views.render('compor.twig', { logado: req.session.logado });
    res.end(output);
});

exports.noticia_inserir = asyncHandler(async (req, res, next) => {
    await Noticia.sync();
    const noticia = await Noticia.create(req.body);
    res.redirect('/noticias');
});

exports.noticia_excluir = asyncHandler(async (req, res, next) => {
    await Noticia.sync();
    const noticia = new Noticia(req.body);
    await noticia.destroy();
    res.redirect('/noticias');
});

exports.noticia_recompor = asyncHandler(async (req, res, next) => {
    const noticia = await Noticia.findOne({
        where: {
            id: req.body.id
        }
    });
    const output = await views.render('compor.twig', { noticia: noticia.dataValues, logado: req.session.logado });
    res.end(output);
});

exports.noticia_editar = asyncHandler(async (req, res, next) => {
    const noticia = await Noticia.findOne({
        where: {
            id: req.body.id
        }
    });
    noticia.titulo = req.body.titulo;
    noticia.texto = req.body.texto;
    noticia.fonte = req.body.fonte;    
    await noticia.save();
    res.redirect('/noticias');
});
