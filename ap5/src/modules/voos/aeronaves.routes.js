const { Router } = require('express');
const controller = require('./aeronaves.controller');
const { validarId } = require('../../middlewares/validacao.middleware');
const { paginar } = require('../../middlewares/paginacao.middleware');

const router = Router();

router.get('/', paginar, controller.listar);
router.get('/:id', validarId, controller.buscarPorId);

module.exports = router;
