const Sequelize = require("sequelize");
const database = require("./database");

const Orcamento = database.define(
  "orcamento",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    empresa: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    licencas: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    setor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mensagem: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    utilizadorid: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    data: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    pacoteid: {
      type: Sequelize.INTEGER,
      allowNull: true,
    }, 
    extensaoid: {
      type: Sequelize.INTEGER,
      allowNull: true,
    }
  },
  {
    tableName: "orcamento",
    timestamps: false,
  }
);

module.exports = Orcamento;