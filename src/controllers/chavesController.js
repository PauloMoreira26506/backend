const Chave = require("../model/chave");
const database = require("../model/database");
const Compra = require("../model/compra");
const Produto = require("../model/produto");
const Utilizador = require("../model/utilizador");
const AssociacaoChave = require("../model/associacaochave");
const sequelize = require("../model/database");
const { Op } = require("sequelize");
const controller = {};

// Controlador para associar uma chave a um utilizador

controller.associarUtilizador = async (req, res) => {
  const { utilizador, produto } = req.body;
  console.log("associar" + utilizador + produto);

  try {
    const chave = await Chave.findOne({
      where: {
        produtoid: produto,
        ativa: "false",
      },
    });

    if (!chave) {
      return res
        .status(400)
        .json({ message: "Não tem chaves disponíveis para este produto" });
    }

    console.log("Chave encontrada:", chave.chave);

    let compra = await Compra.findOne({
      where: {
        utilizadorid: utilizador,
        produtoid: produto,
      },
    });

    if (!compra) {
      compra = await Compra.create({
        utilizadorid: utilizador,
        produtoid: produto,
      });
    }

    await chave.update({
      ativa: true,
      compraid: compra.id,
    });

    res.status(200).json({ message: "Compra concluída" });
  } catch (error) {
    res.status(500).json({ message: "Compra falhou", error });
  }
};

// Controlador para listar todas as chaves

controller.list = async (req, res) => {
  const data = await Chave.findAll().then(function (data) {
    return data;
  });
  res.json({ success: true, data: data });
};

// Controlador para listar uma compra

controller.list_compra = async (req, res) => {
  try {
    const id = req.params.id;
    const compra = await Compra.findAll({
      where: { utilizadorid: id },
      include: { model: Produto },
    }).then(function (compra) {
      return compra;
    });
    res.json({ success: true, data: compra });
  } catch (error) {
    res.status(500).json({ message: "Procura de compras falhou", error });
  }
};

// Controlador para listar as chaves de um compra

controller.list_chaves_compra = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const chave = await Chave.findAll({
      where: { compraid: id },
      include: [{ model: Compra, include: { model: Produto } }],
    }).then(function (chave) {
      return chave;
    });
    res.json({ success: true, data: chave });
  } catch (error) {
    res.status(500).json({ message: "Procura de chaves falhou", error });
  }
};

// Controlador para associar um gerente a uma compra

controller.associarGerente = async (req, res) => {
  const { email, quantidade, compraid, utilizadorAtual } = req.body;
  console.log(email);
  try {
    const destinatario = await Utilizador.findOne({ where: { email } });

    if (!destinatario) {
      return res
        .status(404)
        .json({ success: false, message: "Utilizador não encontrado" });
    }

    if (destinatario.id === utilizadorAtual) {
      return res
        .status(404)
        .json({ success: false, message: "Não pode associar a si mesmo" });
    }

    const chaves = await Chave.findAll({
      where: {
        compraid: compraid,
        id: {
          [Op.notIn]: sequelize.literal(`(
            SELECT "chaveid" FROM "associacaochave")`),
        },
      },
      limit: quantidade,
    });

    if (chaves.length < quantidade) {
      return res.status(400).json({
        success: false,
        message: "Não há chaves suficientes para transferir",
      });
    }

    const compra = await Compra.findOne({ where: { id: compraid } });
    if (!compra) {
      return res
        .status(404)
        .json({ success: false, message: "A compra não foi encontrada" });
    }

    const compradorid = compra.utilizadorid;

    for (let chave of chaves) {
      const [associacao, created] = await AssociacaoChave.findOrCreate({
        where: {
          chaveid: chave.id,
          utilizadorid: destinatario.id,
        },
        defaults: {
          compradorid: compradorid,
        },
      });

      console.log(chave.id);

      if (!created) {
        console.log(
          `A chave ${chave.id} já está associada ao utilizador ${destinatario.id}`
        );
      }
      console.log(`Chave ${chave.id} associada a ${destinatario.id}`);
    }
    res.json({ success: true, message: "Chaves associadas com sucesso" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao associar chaves" });
  }
};

// Controlador para listar as chaves que um comprador associou a um gerente

controller.listar_associacoes_comprador = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("IDD-----", id);
    const associacao = await AssociacaoChave.findAll({
      where: {
        compradorid: id,
      },
      include: [
        {
          model: Chave,
          include: [{ model: Compra, include: [{ model: Produto }] }],
        },
        { model: Utilizador, as: "utilizador" },
        { model: Utilizador, as: "comprador" },
      ],
    }).then(function (associacao) {
      return associacao;
    });
    res.json({ success: true, data: associacao });
  } catch (error) {
    res.status(500).json({ message: "Procura de associações falhou", error });
  }
};

// Controlador para listar as associações que foram atribuídas a um gerente

controller.listar_associacoes_gerente = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("IDD-----", id);
    const associacao = await AssociacaoChave.findAll({
      where: {
        utilizadorid: id,
      },
      include: [
        {
          model: Chave,
          include: [{ model: Compra, include: [{ model: Produto }] }],
        },
        { model: Utilizador, as: "utilizador" },
        { model: Utilizador, as: "comprador" },
      ],
    }).then(function (associacao) {
      return associacao;
    });
    res.json({ success: true, data: associacao });
  } catch (error) {
    res.status(500).json({ message: "Procura de associações falhou", error });
  }
};

module.exports = controller;
