const Sequelize = require('sequelize');
const sequelize = new Sequelize('servicedb', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;