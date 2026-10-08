const { Router } = require('express');
const controller = require('./produtos.controller');
const { validarId, validarCorpoProduto } = require('../../middlewares/validacao.middleware');

const router = Router();

router.post('/', validarCorpoProduto, controller.criar);
router.get('/', controller.listar);
router.get('/:id', validarId, controller.buscarPorId);
router.put('/:id', validarId, validarCorpoProduto, controller.atualizar);
router.delete('/:id', validarId, controller.remover);

module.exports = router;
