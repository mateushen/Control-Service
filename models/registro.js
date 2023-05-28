const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/mysql');

const Funcionario = require('./funcionario');
const Obra = require('./obra');

const Registro = sequelize.define('Registro', {
  horas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  idFuncionario: {
    type: Sequelize.INTEGER,
    references: {
      model: Funcionario,
      key: 'id',
    }
  },
  idObra: {
    type: Sequelize.INTEGER,
    references: {
      model: Obra,
      key: 'id',
    }
  }
}, {
  tableName: 'Registro'
});

module.exports = Registro;