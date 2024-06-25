const sequelize = require('./config/db');
const Produto = require('../models/produto');
const Empresa = require('../models/empresa');
await database.sync();

(async () => {
/*const novaEmpresa = await Empresa.create({
    nome: 'Adobe'
})

const novoProduto = await Produto.create({
    nome: 'Adobe',
    versao: 14,
    tamanho: 10.6,
    preco: 100,
    classificacao: 4.8,
    idEmpresa: novaEmpresa.id
})
console.log(novoProduto);

const produto = await Produto.findByPk(1 { include: Empresa });
console.log(produto.empresa.nome);*/

const empresa = await Empresa.findByPk(1, { include: Produto });
/*const produto = await empresa.getProduto();**/
console.log(empresa.produto);

});

const empresa = await Empresa.findByPk(1);
