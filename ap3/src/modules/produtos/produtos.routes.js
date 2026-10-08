const { Router } = require('express');
const controller = require('./produtos.controller');
const validator = require('./produto.validator');
const { validarId, validarCorpo } = require('../../middlewares/validacao.middleware');

const router = Router();

router.post('/', validarCorpo(validator), controller.criar);
router.get('/', controller.listar);
router.get('/:id', validarId, controller.buscarPorId);
router.put('/:id', validarId, validarCorpo(validator), controller.atualizar);
router.delete('/:id', validarId, controller.remover);

module.exports = router;
