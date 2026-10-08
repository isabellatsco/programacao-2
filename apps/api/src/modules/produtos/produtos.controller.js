const repository = require('./produtos.repository');

function naoEncontrado(res) {
  return res.status(404).json({ mensagem: 'Produto não encontrado.' });
}

function criar(req, res) {
  const produto = repository.inserir(req.body);
  return res.status(201).json(produto);
}

function listar(req, res) {
  return res.json(repository.listar());
}

function buscarPorId(req, res) {
  const produto = repository.buscarPorId(req.id);
  return produto ? res.json(produto) : naoEncontrado(res);
}

function atualizar(req, res) {
  const produto = repository.atualizar(req.id, req.body);
  return produto ? res.json(produto) : naoEncontrado(res);
}

function remover(req, res) {
  return repository.remover(req.id) ? res.status(204).end() : naoEncontrado(res);
}

module.exports = { criar, listar, buscarPorId, atualizar, remover };
