const { Router } = require('express');
const controller = require('./fornecedores.controller');

const router = Router();

router.get('/', controller.listar);
router.get('/novo', controller.novo);
router.post('/', controller.criar);
router.get('/:id/editar', controller.editar);
router.post('/:id', controller.atualizar);
router.post('/:id/excluir', controller.excluir);

module.exports = router;
