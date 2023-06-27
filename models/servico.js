const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql');
const Funcionario = require('./funcionario');
const Obra = require('./obra');

const Servico = sequelize.define('Servico', {
  qtd_horas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Servico'
});

Obra.hasOne(Servico, {
  foreignKey: 'idObra',
  allowNull: false
});

Funcionario.hasOne(Servico, {
  foreignKey: 'idFuncionario',
  allowNull: false
});


module.exports = Servico;