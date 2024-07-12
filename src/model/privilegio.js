const Sequelize = require("sequelize");
const database = require("./database");

const Privilegio = database.define("privilegio", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    designacao: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: "privilegio",
    timestamps: false
});

module.exports = Privilegio;