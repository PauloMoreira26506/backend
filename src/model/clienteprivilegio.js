const Sequelize = require("sequelize");
const database = require("./database");

const ClientePrivilegio = database.define("clienteprivilegio", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    utilizadorid: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }, 
    privilegioid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    }
}, {
    tableName: "clienteprivilegio",
    timestamps: false
});

module.exports = ClientePrivilegio;