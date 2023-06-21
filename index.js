const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bp = require('body-parser');

const checkDatabase = require('./database/checkDatabase');
const checkUsuario = require('./public/functions/checkUser');

try {
  checkDatabase();
} catch (error) {
  console.error('Erro na criação do banco: ', error);
}

const despesa = require('./routes/despesa');
const funcionario = require('./routes/funcionario');
const obra = require('./routes/obra');
const pagamento = require('./routes/pagamento');
const usuario = require('./routes/usuario');

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "./views"));

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

app.use('/despesa', despesa);
app.use('/funcionario', funcionario);
app.use('/obra', obra);
app.use('/pagamento', pagamento);
app.use('/usuario', usuario);

app.get('/', (req, res) => {
  checkUsuario().then((response) => {
    if (response) {
      res.render('usuario/login');
    } else {
      res.render('usuario/cadastro');
    }
  })
});

app.listen(3000, () => {
  console.log('Server rodando')
});