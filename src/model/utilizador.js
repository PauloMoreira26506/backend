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

Utilizador.belongsTo(tipoutilizador, { foreignKey: "tipoutilizadorid" });

const createUtilizador = async () => {
  const utilizadores = [
    {
      nome: "Admin",
      email: "admin@email.com",
      password: "$2b$10$MvA9Vh0yOZu8DAXFZlRml.HqEhkpRYK9AuJvCme3fWYwyluhs4N4a",
      tipoutilizadorid: 1,
    },
    {
      nome: "Comprador",
      email: "comprador@email.com",
      password: "$2b$10$MvA9Vh0yOZu8DAXFZlRml.HqEhkpRYK9AuJvCme3fWYwyluhs4N4a",
      tipoutilizadorid: 2,
    },
    {
      nome: "Gerente",
      email: "gerente@email.com",
      password: "$2b$10$MvA9Vh0yOZu8DAXFZlRml.HqEhkpRYK9AuJvCme3fWYwyluhs4N4a",
      tipoutilizadorid: 3,
    }
  ];

  try {
    // await database.sync();
    await Utilizador.bulkCreate(utilizadores, { ignoreDuplicates: true });
    console.log("Utilizadores criados com sucesso!");
  } catch (error) {
    console.error("Erro ao criar o utilizador: ", error);
  }
};

createUtilizador();

module.exports = Utilizador;
