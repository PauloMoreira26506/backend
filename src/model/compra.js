const Sequelize = require('sequelize');
const database = require("./database");
const Utilizador = require("./utilizador");
const Produto = require("./produto");

const Compra = database.define("compra", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    }
}, {
    tableName: 'compra',
    timestamps: false
});

Compra.belongsTo(Utilizador, { foreignKey: 'utilizadorid'});
Compra.belongsTo(Produto, { foreignKey: 'produtoid'});

module.exports = Compra;