const express = require('express');
const controller = require('../controllers/privilegiosController');

const router = express.Router();

router.get('/', controller.list);
router.post('/create', controller.create);
router.get('/:id', controller.list_cliente);
router.post('/clienteprivilegio', controller.cliente_privilegio);
router.post('/delete', controller.delete);

module.exports = router;
