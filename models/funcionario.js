const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql');

const Funcionario = sequelize.define('Funcionario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valorhora: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  tableName: 'Funcionario'
});

module.exports = Funcionario;