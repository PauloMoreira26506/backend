const express = require ('express');
const router = express.Router();
const middleware = require('../middleware');

const controller = require('../controllers/utilizadorController');

router.get('/list', controller.list);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/:id', controller.listar);

module.exports = router;