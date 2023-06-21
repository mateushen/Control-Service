const { Sequelize } = require('sequelize');

const connection = new Sequelize('mysql://root:root@localhost:3306', {
  dialect: 'mysql',
});

async function checkDatabase() {
  try {
    await connection.query('CREATE DATABASE IF NOT EXISTS servicedb');
    console.log('Banco de dados criado com sucesso.');
  } catch (error) {
    console.error('Erro ao criar banco de dados:', error);
  }
}

module.exports = checkDatabase;