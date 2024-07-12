const express = require('express');
const controller = require('../controllers/ticketController');

const router = express.Router();

router.get('/', controller.list);
router.post('/create', controller.create);

module.exports = router;