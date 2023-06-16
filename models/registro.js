const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/mysql');

const Funcionario = require('./funcionario');
const Obra = require('./obra');

const Registro = sequelize.define('Registro', {
  qtd_horas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  tableName: 'Registro'
});

Obra.hasOne(Registro, {
  foreignKey: 'idObra'
});

Funcionario.hasOne(Registro, {
  foreignKey: 'idFuncionario'
});


module.exports = Registro;