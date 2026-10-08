const repository = require('../repositories/produtos.repository');

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
  const produto = repository.buscarPorId(req.idProduto);
  return produto ? res.json(produto) : naoEncontrado(res);
}

function atualizar(req, res) {
  const produto = repository.atualizar(req.idProduto, req.body);
  return produto ? res.json(produto) : naoEncontrado(res);
}

function remover(req, res) {
  return repository.remover(req.idProduto) ? res.status(204).end() : naoEncontrado(res);
}

module.exports = { criar, listar, buscarPorId, atualizar, remover };
