const Sequelize = require('sequelize');
const database = require('./database');

const EstadoChave = database.define('estadochave', {
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

module.exports = EstadoChave;