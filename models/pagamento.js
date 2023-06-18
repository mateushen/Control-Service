const { DataTypes } = require('sequelize');
const sequelize = require('../database/mysql');
const Funcionario = require('./funcionario');
const Obra = require('./obra');

const Pagamento = sequelize.define('Pagamento', {
  qtd_horas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  tableName: 'Pagamento'
});

Obra.hasOne(Pagamento, {
  foreignKey: 'idObra',
  allowNull: false
});

Funcionario.hasOne(Pagamento, {
  foreignKey: 'idFuncionario',
  allowNull: false
});


module.exports = Pagamento;