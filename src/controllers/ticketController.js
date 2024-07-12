const Ticket = require('../model/ticket');
const Produto = require('../model/produto');
const Utilizador = require('../model/utilizador');

const controller = {};

controller.create = async (req, res) => {
    const { utilizadorid, produtoid, mensagem, compra } = req.body;
    console.log(req.body);
    try {
        const ticket = await Ticket.create({
            utilizadorid: utilizadorid,
            produtoid: produtoid,
            mensagem: mensagem,
            compra: compra,
        });
        res.status(201).json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

controller.list = async (req, res) => {
    try{
        const data = await Ticket.findAll({include: [{model: Produto}, {model: Utilizador}]});
        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = controller;