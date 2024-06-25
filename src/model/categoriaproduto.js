const Sequelize = require('sequelize');
const database = require('./database');

const CategoriaProduto = database.define('categoriaproduto', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  designacao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  tableName: 'categoriaproduto',
  timestamps: false
});

module.exports = CategoriaProduto;