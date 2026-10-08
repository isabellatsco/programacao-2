const { validarProduto, normalizarProduto } = require('../modules/produtos/produto.validator');

function validarId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ mensagem: 'Identificador inválido.' });
  }

  req.idProduto = id;
  return next();
}

function validarCorpoProduto(req, res, next) {
  const erros = validarProduto(req.body);

  if (erros.length > 0) {
    return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
  }

  req.body = normalizarProduto(req.body);
  return next();
}

module.exports = { validarId, validarCorpoProduto };
