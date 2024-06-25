const express = require('express');
const controller = require('../controllers/categoriasController');

const router = express.Router();

router.get('/', controller.listar_todas);
router.post('/create', controller.create);
router.get('/:id', controller.categoria);


module.exports = router;