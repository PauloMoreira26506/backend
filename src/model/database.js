var Sequelize = require("sequelize");


const sequelize = new Sequelize('postgresql://codestore_syvt_user:dres3ZMxuGlsa5BpsVt9l2KjQZZ7GaNZ@dpg-cpti539u0jms73e9iae0-a.frankfurt-postgres.render.com/codestore_syvt', { protocol: 'postgres', dialect: 'postgres', dialectOptions: {ssl: {require: true, rejectUnauthorized: false}}});

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
