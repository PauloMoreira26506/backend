var Categoria = require("../model/categoriaproduto");
var sequelize = require("../model/database");

const controller = {};
sequelize.sync(); // Método para síncronizar os model. Se não existir as      tabelas na base de dados, são criadas automaticamente.

// Controlador para listar as categorias dos produtos

controller.listar_todas = async (req, res) => {
  try{
    const data = await Categoria.findAll()
    res.json({ success: true, data: data });
  } catch(error){
    console.error("Erro ao obter as categorias", error);
    res.status(500).json({success: false, error: 'Internal Server Error'});
  }
};

// Controlador para criar uma categoria

controller.create = async (req,res) => {
  try {
    console.log("Dados recebidos no backend:", req.body);
    const categoria = await Categoria.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para listar a categoria

controller.categoria = async(req, res) => {
  try {
    const id = req.params.id;
    const categoria = await Categoria.findByPk(id);
    if (categoria){
      res.json({success: true, data: categoria});
    }
    else{
      res.status(404).json({ message: "Produto não encotrado"});
    }
  }
  catch(error) {
    res.status(500).json({ message: "Erro ao procurar a categoria", error: error.message});
  }
};


module.exports = controller;