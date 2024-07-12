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
router.get('/listarativas', controller.listar_ativas);
router.post('/instalar/:id', controller.instalar);
router.get('/listarinstaladas/:id', controller.list_chaves_instaladas_compra);
router.post('/desativarassociacao', controller.desativar_associacao);

module.exports = router;