const { Router } = require('express');
const controller = require('./usuarios.controller');
const { completo, parcial } = require('./usuario.validator');
const { validarId, validarCorpo } = require('../../middlewares/validacao.middleware');
const { autenticar, somenteAdmin, adminOuProprio } = require('../../middlewares/auth.middleware');

const router = Router();

router.use(autenticar);

router.post('/', somenteAdmin, validarCorpo(completo), controller.criar);
router.get('/', somenteAdmin, controller.listar);
router.get('/:id', validarId, adminOuProprio, controller.buscarPorId);
router.put('/:id', validarId, adminOuProprio, validarCorpo(completo), controller.atualizar);
router.patch('/:id', validarId, adminOuProprio, validarCorpo(parcial), controller.atualizar);
router.delete('/:id', validarId, somenteAdmin, controller.remover);

module.exports = router;
