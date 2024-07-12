const PacoteProduto = require("./pacoteproduto");
const Pacote = require("./pacote");
const Produto = require("./produto");
const Extensao = require("./extensao");
const Utilizador = require("./utilizador");
const Orcamento = require("./orcamento");
const Chave = require("./chave");
const VersaoProduto = require("./versaoproduto");
const Ticket = require("./ticket");
const Privilegio = require("./privilegio");
const ClientePrivilegio = require("./clienteprivilegio");

// Definindo a associação entre Pacote e Produto
Pacote.hasMany(PacoteProduto, { foreignKey: "pacoteid" });
PacoteProduto.belongsTo(Pacote, { foreignKey: "pacoteid" });

Produto.hasMany(PacoteProduto, { foreignKey: "produtoid" });
PacoteProduto.belongsTo(Produto, { foreignKey: "produtoid" });

// Para incluir Produto em Pacote
Pacote.belongsToMany(Produto, {
  through: PacoteProduto,
  foreignKey: "pacoteid",
});
Produto.belongsToMany(Pacote, {
  through: PacoteProduto,
  foreignKey: "produtoid",
});

Produto.hasMany(Extensao, { foreignKey: "produtoid" });
Extensao.belongsTo(Produto, { foreignKey: "produtoid" });

// Orçamento
Orcamento.belongsTo(Utilizador, { foreignKey: "utilizadorid" });
Utilizador.hasMany(Orcamento, { foreignKey: "utilizadorid" });
Orcamento.belongsTo(Pacote, { foreignKey: "pacoteid"});
Orcamento.belongsTo(Extensao, { foreignKey: "extensaoid"});

// Versão de produto
VersaoProduto.belongsTo(Produto, {foreignKey: "produtoid"});
Produto.hasMany(VersaoProduto, {foreignKey: "produtoid"});

// Ticket
Ticket.belongsTo(Utilizador, { foreignKey: "utilizadorid"});
Utilizador.hasMany(Ticket, { foreignKey: "utilizadorid"});
Ticket.belongsTo(Produto, { foreignKey: "produtoid"});
Produto.hasMany(Ticket, { foreignKey: "produtoid"});

// Privilégio
ClientePrivilegio.belongsTo(Privilegio, { foreignKey: "privilegioid"});
Privilegio.hasMany(ClientePrivilegio, { foreignKey: "privilegioid"});
