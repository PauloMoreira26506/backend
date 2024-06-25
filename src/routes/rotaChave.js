const express = require('express');
const controller = require('../controllers/chavesController');

const router = express.Router();

router.post('/associar', controller.associarUtilizador);
router.get('/listar', controller.list);
router.get('/listar/:id', controller.list_compra);
router.get('/listarcompra/:id', controller.list_chaves_compra);
router.post('/associargerente', controller.associarGerente);
router.get('/associacoescomprador/:id', controller.listar_associacoes_comprador);
router.get('/associacoesgerente/:id', controller.listar_associacoes_gerente);

module.exports = router;