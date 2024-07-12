const sequelize = require("sequelize");
const database = require("./database");
const Produto = require("./produto");
const Pacote = require("./pacote");

const PacoteProduto = database.define(
  "pacoteproduto",
  {
    produtoid: {
      type: sequelize.INTEGER,
      allowNull: false
    },
    pacoteid: {
      type: sequelize.INTEGER,
      allowNull: false
    },
  },
  {
    tableName: "pacoteproduto",
    timestamps: false,
  }
);




module.exports = PacoteProduto;