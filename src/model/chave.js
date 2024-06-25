const Sequelize = require("sequelize");
const database = require("./database");
const Produto = require("./produto");
const Compra = require("./compra");

const Chave = database.define("chave", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chave: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  compraid: {
    type: Sequelize.INTEGER,
    references: {
      model: Compra,
      key: "id",
    },
  },
  ativa: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: "chave",
  timestamps: false
});

Chave.belongsTo(Compra, { foreignKey: 'compraid'});
Produto.hasMany(Chave, { foreignKey: 'produtoid'});
Compra.hasMany(Chave, { foreignKey: 'compraid'});

module.exports = Chave;
