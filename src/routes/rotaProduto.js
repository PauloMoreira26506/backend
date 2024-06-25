const express = require('express');
const controller = require('../controllers/produtosController');

const router = express.Router();

router.get('/', controller.listar);
router.get('/populares', controller.listar_populares);
router.get('/:id', controller.listar_produto);
router.get('/categoria/:id', controller.listar_categoria);
router.post('/create', controller.produto_create);
router.post('/update/:id', controller.update);

module.exports = router;