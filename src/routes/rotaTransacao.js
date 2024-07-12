const express = require('express');
const controller = require('../controllers/transacaoController');

const router = express.Router();

router.get('/transactions', controller.getTransactions);

module.exports = router;
