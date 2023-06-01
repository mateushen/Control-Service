const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bp = require('body-parser');

const check = require('./database/checkDatabase');

try{
    console.log('teste2');
    check();
}catch (error){
    console.log('ERRO Criação do banco');
}

const despesa = require('./routes/despesa');
//const funcionario = require('./routes/funcionario');
const obra = require('./routes/obra');
//const registro = require('./routes/registro');
//const usuario = require('./routes/usuario');

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "./views"));

// app.get('/', (req, res) => {
//     res.render('login');
// });

app.use('/despesa', despesa);
//app.use('/funcionario', funcionario);
app.use('/obra', obra);
//app.use('/registro', registro);
//app.use('/usuario', usuario);

app.listen(3000, () => {
    console.log('Server rodando')
});