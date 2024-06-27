const Sequelize = require('sequelize');
const database = require('./database');

const CategoriaProduto = database.define('categoriaproduto', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  designacao: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'categoriaproduto',
  timestamps: false
});

const createCategoria = async () => {
  const categorias = [
    { designacao: 'Programação'},
    { designacao: 'Design'},
    { designacao: 'Música'},
    { designacao: 'Navegadores'}
  ];

  try{
    await database.sync();
    await CategoriaProduto.bulkCreate(categorias, {ignoreDuplicates: true});
    console.log("Categorias criadas com sucesso!");
  } catch (error) {
    console.log("Erro ao criar categorias: ", error);
  }
}

createCategoria();

module.exports = CategoriaProduto;