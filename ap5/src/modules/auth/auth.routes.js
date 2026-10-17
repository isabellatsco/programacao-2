const { Router } = require('express');
const controller = require('./auth.controller');
const validator = require('./login.validator');
const { validarCorpo } = require('../../middlewares/validacao.middleware');

const router = Router();

router.post('/login', validarCorpo(validator), controller.login);

module.exports = router;
