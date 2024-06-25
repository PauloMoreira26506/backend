const Sequelize = require('sequelize');
const database = require('./database');

const Orcamento = database.define('orcamento', {
  id: {
    type: Sequelize.SERIAL,
    primaryKey: true,
    autoIncrement: true
  },
  /*uti_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },*/
  nomeempresa: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numerolicancas: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  setor: {
    type: Sequelize.STRING,
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

Orcamento.belongsTo(Utilizador, {
    constraint: true,
    ForeignKey: 'uti_id'
})

module.exports = Orcamento;