const Sequelize = require("sequelize");
const database = require("./database");

const Pacote = database.define(
  "pacote",
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
  },
  {
    tableName: "pacote",
    timestamps: false,
  }
);



const createPacotes = async () => {
  const pacotes = [
     { designacao: 'Programação'}
  ];

  try{
    // await database.sync();
    await Pacote.bulkCreate(pacotes, {ignoreDuplicates: true});
    console.log("Pacotes criados com sucesso!");
  } catch (error) {
    console.error("Erro ao criar pacotes: ", error);
  }
}

createPacotes();

module.exports = Pacote;
