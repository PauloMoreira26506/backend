const Sequelize = require('sequelize');
const database = require('./database');

const Pacote = database.define('pacote', {
  id: {
    type: Sequelize.SERIAL,
    primaryKey: true,
    autoIncrement: true
  },
  designacao: {
    type: Sequelize.TEXT,
    allowNull: true
  }
});

module.exports = Pacote;