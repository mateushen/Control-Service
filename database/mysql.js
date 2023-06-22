const Sequelize = require('sequelize');
const sequelize = new Sequelize('servicedb', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

async function createDB() {
  await sequelize.query('CREATE SCHEMA IF NOT EXISTS servicedb').then((response) => {
    console.log('Schema created successfully');
  }).catch((error) => {
    console.error('Error creating schema:', error);
  });
}

createDB;

module.exports = sequelize;