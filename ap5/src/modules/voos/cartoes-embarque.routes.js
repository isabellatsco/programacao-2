const { Router } = require('express');
const controller = require('./cartoes-embarque.controller');
const { validarId } = require('../../middlewares/validacao.middleware');
const { paginar } = require('../../middlewares/paginacao.middleware');

const router = Router();

router.get('/', paginar, controller.listar);
router.get('/detalhes', paginar, controller.listarDetalhes);
router.get('/:id', validarId, controller.buscarPorId);

module.exports = router;
