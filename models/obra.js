const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql');
const Despesa = require('./despesa');

const Obra = sequelize.define('Obra', {
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valorservico: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'Obra'
});

module.exports = Obra;