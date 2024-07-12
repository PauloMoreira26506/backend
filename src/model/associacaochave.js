const sequelize = require("sequelize");
const database = require("./database");
const Utilizador = require("./utilizador");
const Chave = require("./chave");
const Compra = require("./compra");

const AssociacaoChave = database.define("associacaochave", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    chaveid: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    compradorid: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    utilizadorid: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    ativa: {
        type: sequelize.BOOLEAN,
        defaultValue: true,
    }
}, {
    tableName: "associacaochave",
    timestamps: false
});

Chave.belongsTo(Compra, { foreignKey: 'compraid'});
Chave.belongsToMany(Utilizador, { through: AssociacaoChave, foreignKey: 'chaveid'});
Utilizador.belongsToMany(Chave, { through: AssociacaoChave, foreignKey: 'utilizadorid'});

// Utilizador.hasMany(AssociacaoChave, {foreignKey: 'compradorid'});
AssociacaoChave.belongsTo(Utilizador, {foreignKey: 'utilizadorid', as: 'utilizador'});
AssociacaoChave.belongsTo(Utilizador, {foreignKey: 'compradorid', as: 'comprador'});
AssociacaoChave.belongsTo(Compra, {foreignKey: 'compradorid'});
AssociacaoChave.belongsTo(Chave, {foreignKey: 'chaveid'});

module.exports = AssociacaoChave;



