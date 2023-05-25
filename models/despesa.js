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
  },
  idObra: {
    type: Sequelize.INTEGER,
    references: {
      model: Obra,
      key: 'id',
    }
  }
}, {
  tableName: 'Despesa'
});

module.exports = Despesa;