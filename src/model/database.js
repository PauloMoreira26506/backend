var Sequelize = require("sequelize");

const sequelize = new Sequelize("codestore", "postgres", "postgres", {
  host: "localhost",
  port: "5432",
  dialect: "postgres",
});

// Método para síncronizar os model. 
// Se não existir as tabelas na base de dados, são criadas automaticamente.
// sequelize
//   .sync({force: true})
//   .then(() => {
//     console.log("Tabelas criadas!");
//   })
//   .catch((err) => {
//     console.error("Não foi possivel criar as tabelas.", err);
//   });

module.exports = sequelize;
