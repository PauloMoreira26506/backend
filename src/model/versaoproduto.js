const Sequelize = require("sequelize");
const database = require("./database");
const Produto = require("./produto");

const VersaoProduto = database.define(
  "versaoproduto",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    versao: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    produtoid: {
      type: Sequelize.INTEGER,
      references: {
        model: Produto,
        key: "id",
      },
    },
  },
  {
    tableName: "versaoproduto",
    timestamps: false,
    indexes: [{ unique: true, fields: ["versao", "produtoid"] }],
  }
);

const createversoes = async () => {
  const versoes = [
    {
      versao: "1.0.0",
      produtoid: 1,
    },
    {
      versao: "2.0.0",
      produtoid: 1,
    },
    {
      versao: "1.0.0",
      produtoid: 2,
    },
    {
      versao: "2.0.0",
      produtoid: 2,
    },
    {
      versao: "1.0.0",
      produtoid: 3,
    },
    {
      versao: "2.0.0",
      produtoid: 3,
    },
    {
      versao: "1.0.0",
      produtoid: 4,
    },
    {
      versao: "2.0.0",
      produtoid: 4,
    },
    {
      versao: "1.0.0",
      produtoid: 5,
    },
    {
      versao: "2.0.0",
      produtoid: 5,
    },
    {
      versao: "1.0.0",
      produtoid: 6,
    },
    {
      versao: "2.0.0",
      produtoid: 6,
    },
    {
      versao: "1.0.0",
      produtoid: 7,
    },
    {
      versao: "2.0.0",
      produtoid: 7,
    },
    {
      versao: "1.0.0",
      produtoid: 8,
    },
    {
      versao: "2.0.0",
      produtoid: 8,
    },
  ];

  try {
    await VersaoProduto.bulkCreate(versoes, { ignoreDuplicates: true });
    console.log("Versões de produto criadas com sucesso");
  } catch (error) {
    console.error("Erro ao criar versões de produtos: ", error);
  }
};

createversoes();
module.exports = VersaoProduto;
