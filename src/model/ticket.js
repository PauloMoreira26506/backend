const Sequelize = require('sequelize');
const database = require('./database');

const Ticket = database.define('ticket', {
  id: {
    type: Sequelize.SERIAL,
    primaryKey: true,
    autoIncrement: true
  },
  /*est_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  uti_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },*/
  mensagem: {
    type: Sequelize.TEXT,
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

Ticket.belongsTo(Estado, {
    constraint: true,
    ForeignKey: 'est_id'
})

Ticket.belongsTo(Utilizador, {
    constraint: true,
    ForeignKey: 'uti_id'
})

Utilizador.hasMany(Ticket, {
    ForeignKey: 'uti_id'
})

module.exports = Ticket;