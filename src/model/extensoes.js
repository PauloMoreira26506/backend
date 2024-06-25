const Sequelize = require('sequelize');
const database = require('./database');

const Extensoes = database.define('extensoes', {
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

module.exports = Extensoes;