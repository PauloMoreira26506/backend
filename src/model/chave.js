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

const createChave = async () => {
  const chaves = [
    { chave: 'chave1', produtoid: 9},
    { chave: 'chave2', produtoid: 9},
    { chave: 'chave3', produtoid: 10},
    { chave: 'chave4', produtoid: 10},
    { chave: 'chave5', produtoid: 11},
    { chave: 'chave6', produtoid: 11},
    { chave: 'chave7', produtoid: 12},
    { chave: 'chave8', produtoid: 12},
    { chave: 'chave9', produtoid: 13},
    { chave: 'chave10', produtoid: 13},
  ];

  try{
    // await database.sync();
    await Chave.bulkCreate(chaves, {ignoreDuplicates: true});
    console.log("As chaves foram criadas!");
  } catch (error) {
    console.error("Erro ao criar as chaves: ", error);
  }
}

createChave();

module.exports = Chave;
