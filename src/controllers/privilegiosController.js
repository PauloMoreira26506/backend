const Privilegio = require("../model/privilegio");
const ClientePrivilegio = require("../model/clienteprivilegio");

const controller = {};

controller.list = async (req, res) => {
  try {
    const data = await Privilegio.findAll();
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.create = async (req, res) => {
  const { privilegio } = req.body;
  const novoPrivilegio = await Privilegio.create({ designacao: privilegio });
  res.json(novoPrivilegio);
};

controller.list_cliente = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ClientePrivilegio.findAll(
      { where: { utilizadorid: id}, include: { model: Privilegio} }
    );
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

controller.cliente_privilegio = async (req, res) => {
  const { privilegioid, utilizadorid } = req.body;
  try {
    const novo = await ClientePrivilegio.create({ privilegioid, utilizadorid, ativo: true});
    res.json(novo);
  } catch (error) {
    console.error(error);
  }
};

controller.delete = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await ClientePrivilegio.destroy({ where: { id: id } });
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = controller;
