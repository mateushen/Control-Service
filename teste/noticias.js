const express = require('express');
const router = express.Router();
const noticia_controller = require('../controllers/noticiaController');

router.use(function timeLog(req, res, next) {
  if(req.session.logado){
    next();
  } else {
    res.redirect('/user/login');
  }
});

router.get('/', noticia_controller.noticia_lista);
router.get('/compor', noticia_controller.noticia_compor);
router.post('/inserir', noticia_controller.noticia_inserir);
router.post('/excluir', noticia_controller.noticia_excluir);
router.post('/recompor', noticia_controller.noticia_recompor);
router.post('/editar', noticia_controller.noticia_editar);

module.exports = router;