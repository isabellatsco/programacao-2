const repository = require('./cartoes-embarque.repository');

async function listar(req, res) {
  return res.json(await repository.listar(req.paginacao));
}

async function listarDetalhes(req, res) {
  return res.json(await repository.listarDetalhes(req.paginacao));
}

async function buscarPorId(req, res) {
  const cartao = await repository.buscarPorId(req.id);
  return cartao ? res.json(cartao) : res.status(404).json({ mensagem: 'Cartão de embarque não encontrado.' });
}

module.exports = { listar, listarDetalhes, buscarPorId };
