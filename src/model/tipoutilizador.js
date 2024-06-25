const Sequelize = require('sequelize');
const database = require('./database');

const TipoUtilizador = database.define('tipoutilizador', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  designacao: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'tipoutilizador',
  timestamps: false
});

const createTiposUtilizadores = async () => {
  const tiposUtilizadores = [
     { designacao: 'Administrador'},
     { designacao: 'Comprador'},
     { designacao: 'Gestor'}
  ];

  try{
    await database.sync();
    await TipoUtilizador.bulkCreate(tiposUtilizadores, {ignoreDuplicates: true});
    console.log("Tipos de utilizadores criados com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tipos de utilizadores: ", error);
  }
}

createTiposUtilizadores();

module.exports = TipoUtilizador;