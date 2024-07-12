const Produto = require("./produto");
const database = require("./database");


const createPacoteProduto = async () => {
  const pacoteproduto = [{ produtoid: 1, pacoteid: 1 }];

  try {
    // await database.sync();
    await PacoteProduto.bulkCreate(pacoteproduto, { ignoreDuplicates: true });
    console.log("PacoteProduto criados com sucesso!");
  } catch (error) {
    console.error("Erro ao criar PacoteProduto: ", error);
  }
};

module.exports = { createPacoteProduto };
