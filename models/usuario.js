const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql');

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Usuario'
});

module.exports = Usuario;