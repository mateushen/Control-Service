const express = require('express');
const session = require('express-session');
const bp = require('body-parser');

const dbconnection = require('./connection/connection');

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const noticias_router = require('./router/noticias');
const user_router = require('./router/user');
const views = require('./views/views');

const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

var sessionStore = new SequelizeStore({
    db: dbconnection,
  });

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "blasterizadorde123456789",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
    store: sessionStore
}));

sessionStore.sync();


app.get('/', (req, res) => {
    views.render('index.twig', { logado: req.session.logado })
        .then((output) => {
            res.end(output);
        });
});

app.use(express.static(__dirname + '/views/css'));
app.use('/noticias', noticias_router);
app.use('/user', user_router);

app.listen(3000, () => {
    console.log('Server rodando');
});