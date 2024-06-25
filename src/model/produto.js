const Sequelize = require("sequelize");
const database = require("./database");
var categoria = require('./categoriaproduto');

const Produto = database.define("produto", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  emp: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  versao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tamanho: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  publicacao: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  preco: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  classificacao: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  capa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  popular: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  descricao: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  prints: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  categoriaid:{
    type: Sequelize.INTEGER,
    references: {
      model: categoria,
      key: 'id'
    }
  }
}, {
  tableName: 'produto',
  timestamps: false
});

Produto.belongsTo(categoria, { foreignKey: 'categoriaid'});

module.exports = Produto;
