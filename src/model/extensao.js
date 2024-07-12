const Sequelize = require("sequelize");
const database = require("./database");

const Extensao = database.define(
  "extensao",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    designacao: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    produtoid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'produto',
          key: 'id'
        }
    }
  },
  {
    tableName: "extensao",
    timestamps: false,
  }
);



const createExtensoes = async () => {
  const extensoes = [
     { designacao: 'Standard Edition', produtoid: 1},
  ];

  try{
    // await database.sync();
    await Extensao.bulkCreate(extensoes, {ignoreDuplicates: true});
    console.log("Extensões criadas com sucesso!");
  } catch (error) {
    console.error("Erro ao criar extensões: ", error);
  }
}

createExtensoes();

module.exports = Extensao;