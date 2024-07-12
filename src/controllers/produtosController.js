var Produto = require("../model/produto");
var Categoria = require("../model/categoriaproduto");
var PacoteProduto = require("../model/pacoteproduto");
var Pacote = require("../model/pacote");
var Extensao = require("../model/extensao");
var VersaoProduto = require("../model/versaoproduto");
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
      produtos = await Produto.findAll({
        include: { model: Categoria },
      });
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
  console.log("Id-------------------: ", id);
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

  console.log(
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
    prints
  );
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
      categoriaid: categoriaid.id,
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
  const del = await Produto.destroy({ where: { id: id } });
  res.json({ success: true, deleted: del, message: "Deleted succssful" });
};

// Controlador para buscar os pacotes a que um produto pertence

controller.pacote = async (req, res) => {
  const id = req.params.id;
  console.log("Pacotes do produto: ", id);

  try {
    const data = await PacoteProduto.findAll({
      where: { produtoid: id },
      include: [
        {
          model: Pacote,
          attributes: ["id", "designacao"],
          include: [{ model: Produto, attributes: ["id", "nome"] }],
        },
      ],
    });
    if (data.length > 0) {
      res.json({ success: true, data: data });
    } else {
      res.status(404).json({ message: "Pacotes não encontrados." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao procurar os pacotes: ", error: error.message });
  }
};

// Controlador para buscar as extensões a que um produto pertence

controller.extensoes = async (req, res) => {
  const id = req.params.id;
  console.log("Extensões do produto: ", id);

  try {
    const data = await Extensao.findAll({
      where: { produtoid: id },
    });
    if (data.length > 0) {
      res.json({ success: true, data: data });
    } else {
      res.status(404).json({ message: "Extensões não encontrados." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erro ao procurar as extensões: ",
      error: error.message,
    });
  }
};

controller.versoes = async (req, res) => {
  const id = req.params.id;
  console.log("Versões do produto: ", id);
  try {
    const data = await VersaoProduto.findAll({
      where: { produtoid: id },
      include: { model: Produto },
    });
    if (data.length > 0) {
      res.json({ success: true, data: data });
    } else {
      res.status(404).json({ message: "Versões não encontradas." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao procurar as versões: ", error: error.message });
  }
};

controller.criar_versao = async (req, res) => {
  const { id } = req.params;
  const {versao} = req.body;
  try{
    const data = await VersaoProduto.create({
      versao: versao,
      produtoid: id,
    });
    res.json({ success: true, data: data, message: "Versão criada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar a versão: ", error: error.message });
  }
}

controller.listar_pacotes = async (req, res) => {
  try{
    const data = await Pacote.findAll();
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ message: "Erro ao procurar os pacotes: ", error: error.message });
  }
}

controller.listar_pacoteproduto = async (req, res) => {
try{
  const data = await PacoteProduto.findAll();
  res.json({ success: true, data: data });
} catch (error) {
  res.status(500).json({ message: "Erro ao procurar os pacotes: ", error: error.message });
}
};

controller.listar_extensoes = async (req, res) => {
  try{
    const data = await Extensao.findAll();
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ message: "Erro ao procurar as extensoes: ", error: error.message });
  }
};

controller.criar_extensao = async (req, res) => {
  const { id } = req.params;
  const {designacao, descricao} = req.body;
  console.log(id, req.body);
  try{
    const data = await Extensao.create({
      designacao: designacao,
      descricao: descricao,
      produtoid: id,
    });
    res.json({ success: true, data: data, message: "Extensão criada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar a extensão: ", error: error.message });
  }
}
controller.criar_pacote = async (req, res) => {
  const {designacao} = req.body;
  try{
    const data = await Pacote.create({
      designacao: designacao,
    });
    res.json({ success: true, data: data, message: "Pacote criado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar o pacote: ", error: error.message });
  }
};

controller.associar_pacote = async (req, res) => {
  const {produtoid, pacoteid} = req.body;
  console.log(req.body);
  try{
    const data = await PacoteProduto.create({
      pacoteid: pacoteid,
      produtoid: produtoid,
    });
    res.json({ success: true, data: data, message: "Associação criada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar a associação: ", error: error.message });
  }
};

controller.listar_produtospacote = async (req, res) => {
  const {id} = req.params;
  try{
    const data = await PacoteProduto.findAll({
      where: { pacoteid: id },
      include: { model: Produto },
    });
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ message: "Erro ao procurar os produtos: ", error: error.message });
  }
};

module.exports = controller;
