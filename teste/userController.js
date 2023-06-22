const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const views = require('../views/views');

const argon2 = require('argon2');

exports.prompt_register = asyncHandler(async (req, res, next) => {
  const output = await views.render('form_register.twig');
  res.end(output);
});

exports.register = asyncHandler(async (req, res, next) => {
  await User.sync();
  const user = req.body;
  user.senha = await argon2.hash(user.senha);
  await User.create(user);
  res.redirect('/noticias');
});

exports.prompt_login = asyncHandler(async (req, res, next) => {
  const output = await views.render('form_login.twig');
  res.end(output);
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ where: { usuario: req.body.usuario } });
  if (user === null) {
    res.json({ mensagem: 'Usuário não localizado' });
  }
  else {
    try {
      if (await argon2.verify(user.senha, req.body.senha)) {
        req.session.logado = true;
        req.session.usuario = req.body.usuario;
        res.redirect('/');
      } else {
        res.json({ mensagem: 'Credenciais inválidas' });
      }
    } catch (error) {
      res.json({ mensagem: 'Internal error' });
    }
  }
  res.end();
});

exports.logout = asyncHandler(async (req, res, next) => {
  req.session.destroy((err) => { });
  res.redirect('/');
});
