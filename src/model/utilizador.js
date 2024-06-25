const Sequelize = require("sequelize");
const database = require("./database");
const bcrypt = require("bcrypt");
var tipoutilizador = require("./tipoutilizador");

const Utilizador = database.define(
  "utilizador",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    telemovel: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    idioma: {
      type: Sequelize.STRING,
    },
    bio: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tipoutilizadorid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "tipoutilizador",
        key: "id",
      },
    },
  },
  {
    tableName: "utilizador",
    timestamps: false,
  }
);

Utilizador.beforeCreate((utilizador, options) => {
  return bcrypt
    .hash(utilizador.password, 10)
    .then((hash) => {
      utilizador.password = hash;
    })
    .catch((err) => {
      throw new Error();
    });
});

Utilizador.belongsTo(tipoutilizador, { foreignKey: 'tipoutilizadorid' });

module.exports = Utilizador;
