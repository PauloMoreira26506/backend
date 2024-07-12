const express = require('express');
const controller = require('../controllers/produtosController');

const router = express.Router();

router.get('/', controller.listar);
router.get('/pacotes', controller.listar_pacotes);
router.get('/pacotesproduto', controller.listar_pacoteproduto);
router.get('/extensoes', controller.listar_extensoes);
router.get('/populares', controller.listar_populares);
router.get('/:id', controller.listar_produto);
router.get('/categoria/:id', controller.listar_categoria);
router.post('/create', controller.produto_create);
router.post('/update/:id', controller.update);
router.post('/delete', controller.delete);
router.get('/pacotes/:id', controller.pacote);
router.get('/extensoes/:id', controller.extensoes);
router.get('/versoes/:id', controller.versoes);
router.post('/criarversao/:id', controller.criar_versao);


module.exports = router;