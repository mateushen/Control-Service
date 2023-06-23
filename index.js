const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bp = require('body-parser');
const session = require('express-session');
const checkUsuario = require('./public/functions/checkUser');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const dbconnection = require('./database/mysql');

const app = express();

const despesa = require('./routes/despesa');
const funcionario = require('./routes/funcionario');
const obra = require('./routes/obra');
const pagamento = require('./routes/pagamento');
const usuario = require('./routes/usuario');

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


var sessionStore = new SequelizeStore({
  db: dbconnection,
});

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
  secret: "123456789",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false,
  store: sessionStore
}));

sessionStore.sync();

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "./views"));

const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

app.use('/usuario', usuario);
app.use('/funcionario', funcionario);
app.use('/obra', obra);
app.use('/pagamento', pagamento);
app.use('/despesa', despesa);

app.get('/', (req, res) => {
  checkUsuario().then((response) => {
    if (response) {
      res.render('usuario/login');
    } else {
      res.render('usuario/cadastro');
    }
  })
});

app.get('/usuario/cadastrar', (req, res) => {
  checkUsuario().then((response) => {
    if (response) {
      res.render('usuario/login');
    }
  })
});

app.listen(3000, () => {
  console.log('Server rodando')
});