var Produto = require("../model/produto");
var Categoria = require("../model/categoriaproduto");
var sequelize = require("../model/database");
const { Op } = require("sequelize");

const controller = {};

// Controlador para listar os produtos
controller.listar = async (req, res) => {
  const { q } = req.query;
  try {
    let produtos;
    if (q) {
      produtos = await Produto.findAll({
        where: {
          nome: {
            [Op.iLike]: `%${q}%`,
          },
        },
        include: Categoria,
      });
    } else {
      produtos = await Produto.findAll({ include: Categoria });
    }
    res.json({ success: true, data: produtos });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao pesquisar", error: error.message });
  }
};

// Controlador para listar os produtos populares

controller.listar_populares = async (req, res) => {
  const data = await Produto.findAll({
    where: { popular: true },
    include: Categoria,
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

//Controlador para listar os produtos de uma categoria

controller.listar_categoria = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Produto.findAll({
      where: { categoriaid: id },
      include: Categoria,
    });

    if (data.length > 0) {
      res.status(200).json({ success: true, data: data });
    } else {
      res
        .status(404)
        .json({ message: "Nenhum produto encontrado para esta categoria" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar produtos", error: error.message });
  }
};

// Controlador para listar um produto

controller.listar_produto = async (req, res) => {
  const id = req.params.id;

  try {
    const produto = await Produto.findByPk(id, { include: Categoria });
    if (produto) {
      res.json({ success: true, data: produto });
    } else {
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao procurar o produto", error: error.message });
  }
};

// Controlador para criar um produto

controller.produto_create = async (req, res) => {
  try {
    console.log("Dados recebidos no backend:", req.body);
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (error) {
    console.error("Erro ao criar o produto:", error);
    res.status(400).json({ error: error.message });
  }
};

// Controlador para editar o produto

controller.update = async (req, res) => {
  const { id } = req.params;
  console.log("Id-------------------: ", id.id);
  const {
    nome,
    emp,
    versao,
    tamanho,
    publicacao,
    preco,
    classificacao,
    imagem,
    capa,
    popular,
    descricao,
    categoriaid,
    prints,
  } = req.body;
  const data = await Produto.update(
    {
      nome: nome,
      emp: emp,
      versao: versao,
      tamanho: tamanho,
      publicacao: publicacao,
      preco: preco,
      classificacao: classificacao,
      imagem: imagem,
      capa: capa,
      popular: popular,
      descricao: descricao,
      prints: prints,
      categoriaid: categoriaid,
    },
    { where: { id: id } }
  )
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data, message: "Update successful" });
};

// Controlador para eliminar um produto

controller.delete = async (req, res) => {
  const { id } = req.body;
  const del = await Produto.destroy({ where: { id: id } })
  res.json({success: true, deleted: del, message: "Deleted succssful"});
}
module.exports = controller;
