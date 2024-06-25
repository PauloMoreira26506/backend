const Sequelize = require('sequelize');
const database = require('./database');

const Estado = database.define('estado', {
  id: {
    type: Sequelize.SERIAL,
    primaryKey: true,
    autoIncrement: true
  },
  estado: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = Estado;