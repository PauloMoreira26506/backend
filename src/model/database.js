var Sequelize = require("sequelize");

const sequelize = new Sequelize('postgresql://codestore_l659_user:W7wDB9DcLqsQQ7CH3dnf4BW6OH2161nE@dpg-cq8m4mtds78s73dm1vcg-a.frankfurt-postgres.render.com/codestore_l659', { protocol: 'postgres', dialect: 'postgres', dialectOptions: {ssl: {require: true, rejectUnauthorized: false}}});

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
