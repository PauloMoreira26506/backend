var Sequelize = require("sequelize");

const sequelize = new Sequelize('postgresql://codestore_syvt_user:dres3ZMxuGlsa5BpsVt9l2KjQZZ7GaNZ@dpg-cpti539u0jms73e9iae0-a.frankfurt-postgres.render.com/codestore_syvt', { protocol: 'postgres', dialect: 'postgres', dialectOptions: {ssl: {require: true, rejectUnauthorized: false}}});
// Fazer o comando rs algumas vezes depois de iniciar o backend cria os utilizadores e produtos
// admin@email.com - pass
// comprador@email.com - pass 
// gerente@email.com - pass
// Ao iniciar sessão não consegue entrar na página do produto, mas se atualizar a página consegue

// Método para síncronizar os model. 
// Se não existir as tabelas na base de dados, são criadas automaticamente.

sequelize
  .sync()
  .then(() => {
    console.log("Tabelas criadas!");
  })
  .catch((err) => {
    console.error("Não foi possivel criar as tabelas.", err);
  });

module.exports = sequelize;
