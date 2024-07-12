const express = require ('express');
const router = express.Router();
const middleware = require('../middleware');

const controller = require('../controllers/utilizadorController');

router.get('/list', controller.list);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/clientes', controller.listar_clientes);
router.post('/update/:id', controller.update);
router.get('/:id', controller.listar);


module.exports = router;