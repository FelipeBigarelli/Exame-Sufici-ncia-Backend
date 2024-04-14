const Sequelize = require('sequelize');

const db = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '1234',
  database: 'backend',
});

db.authenticate()
  .then(() => console.log('Connected with MySQL'))
  .catch((error) => console.log(error));

module.exports = db;
