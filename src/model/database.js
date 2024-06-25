var Sequelize = require("sequelize");

const sequelize = new Sequelize('codestore_syvt', 'codestore_syvt_user', 'dres3ZMxuGlsa5BpsVt9l2KjQZZ7GaNZ', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres'
});


module.exports = sequelize;