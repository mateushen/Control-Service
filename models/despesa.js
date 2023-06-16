const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/mysql');

const Obra = require('./obra');

const Despesa = sequelize.define('Despesa', {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  valor: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  tableName: 'Despesa'
});

Obra.hasOne(Despesa, {
  foreignKey: 'idObra'
});

module.exports = Despesa;