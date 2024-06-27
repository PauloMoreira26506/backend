const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Utilizador = require('../model/utilizador');
const database = require('../model/database');
const config = require('../config');
const TipoUtilizador = require('../model/tipoutilizador');

const controller = {}

controller.list = async (req, res) => {
    const data = await Utilizador.findAll()
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success: true, data: data});
}

// Controlador para listar um utilizador

controller.listar = async (req, res) => {
    const id = req.params.id;
    
    try{
      const utilizador = await Utilizador.findByPk(id, { include: TipoUtilizador });
      if (utilizador) {
        res.json({success: true, data: utilizador});
      }
      else{
        res.status(404).json({ message: "Utilizador não encontrado"});
      }
    }
    catch (error) {
      res.status(500).json({ message: "Erro ao procurar o utilizador", error: error.message});
    }
  };

// Controlador para criar um utilizador

controller.register = async (req, res) => {
    const { nome, email, password, tipoutilizador } = req.body;
    console.log(tipoutilizador);
    const data = await Utilizador.create({
        nome: nome,
        email: email,
        password: password,
        tipoutilizadorid: tipoutilizador
    })
    .then(function(data){
        return data;
    })
    .catch(error => {
        console.log("Erro: " + error);
        return error;
    })
    res.status(200).json({ success: true, message: "Registado", data: data});
}

// Controlador para verificar um utilizador

controller.login = async (req, res) => {
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
    }
    var utilizador = await Utilizador.findOne({ where: { email: email }})
    .then(function(data){
        return data;
    })
    .catch(error => {
        console.log("Erro: " + error);
        return error;
    })
    if (password === null || typeof password === "undefined") {
        res.status(403).json({
            success: false,
            message: 'Campos em Branco'
        });
    } else {
        if (req.body.email && req.body.password && utilizador) {
            const isMatch = bcrypt.compareSync(password, utilizador.password);
            if (req.body.email === utilizador.email && isMatch) {
                let token = jwt.sign({ email: req.body.email }, config.jwtSecret, {
                    expiresIn: '1h'
                });
                res.json({ success: true, message: 'Autenticação realizada com sucesso!', token: token, id: utilizador.id, tipoutilizador: utilizador.tipoutilizadorid});
            } else {
                res.status(403).json({ success: false, message: 'Dados de autenticação inválidos.'});
            }
        } else {
            res.status(400).json({ success: false, message: 'Erro no processo de autenticação. Tente de novo mais tarde.'});
        }
    }
}

module.exports = controller;