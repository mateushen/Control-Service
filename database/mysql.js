const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('servicedb', 'root', 'root', {
    dialect: 'mysql'
})

module.exports = sequelize;