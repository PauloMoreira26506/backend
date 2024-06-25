const Sequelize = require('sequelize');
const database = require('./database');

const Fatura = database.define('fatura', {
  id: {
    type: Sequelize.SERIAL,
    primaryKey: true,
    autoIncrement: true
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false
  },
  preco: {
    type: Sequelize.MONEY,
    allowNull: false
  },
  quantidade:{
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Fatura;