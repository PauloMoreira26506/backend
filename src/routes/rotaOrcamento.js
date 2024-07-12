const express = require("express");
const controller = require("../controllers/orcamentoController");

const router = express.Router();

router.get('/', controller.listar);
router.post('/create', controller.create);
router.get('/:id', controller.listarPorId);


module.exports = router;