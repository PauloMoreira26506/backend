var Orcamento = require("../model/orcamento");
var Utilizador = require("../model/utilizador");
var Pacote = require("../model/pacote");
var Extensao = require("../model/extensao");

const controller = {};

controller.listar = async (req, res) => {
  try {
    const data = await Orcamento.findAll({
      include: { model: Utilizador, attributes: ["email", "telemovel"] },
    });
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Erro ao obter os orcamentos", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

controller.create = async (req, res) => {
  try {
    console.log("Dados recebidos no backend:", req.body);

    const orcamento = await Orcamento.create(req.body)
      .then((result) => {
        console.log("Orcamento criado:", result);
      })
      .catch((error) => {
        console.error("Erro ao criar orcamento:", error);
      });
    res.status(201).json(orcamento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

controller.listarPorId = async (req, res) => {
  try {
    const data = await Orcamento.findOne({
      where: { id: req.params.id },
      include: [
        { model: Utilizador, attributes: ["email", "telemovel"] },
        { model: Pacote },
        { model: Extensao },
      ],
    });
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Erro ao obter os orcamentos", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = controller;
