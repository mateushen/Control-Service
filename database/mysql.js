const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:12345@localhost:3306/servicedb', {
  dialect: 'mysql',
});

module.exports = sequelize;