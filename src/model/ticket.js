const Sequelize = require("sequelize");
const database = require("./database");

const Ticket = database.define("ticket", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    utilizadorid: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    produtoid: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }, 
    data: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    mensagem: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    compra: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "ticket",
    timestamps: false,
});

module.exports = Ticket;