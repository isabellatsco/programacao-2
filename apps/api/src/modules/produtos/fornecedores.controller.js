const repository = require('./fornecedores.repository');
const produtosRepository = require('./produtos.repository');

function naoEncontrado(res) {
  return res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
}

function criar(req, res) {
  const fornecedor = repository.inserir(req.body);
  return res.status(201).json(fornecedor);
}

function listar(req, res) {
  return res.json(repository.listar());
}

function buscarPorId(req, res) {
  const fornecedor = repository.buscarPorId(req.id);
  return fornecedor ? res.json(fornecedor) : naoEncontrado(res);
}

function atualizar(req, res) {
  const fornecedor = repository.atualizar(req.id, req.body);
  return fornecedor ? res.json(fornecedor) : naoEncontrado(res);
}

function remover(req, res) {
  if (produtosRepository.listar().some((produto) => produto._idFornFK === req.id)) {
    return res.status(409).json({ mensagem: 'Fornecedor possui produtos vinculados.' });
  }

  return repository.remover(req.id) ? res.status(204).end() : naoEncontrado(res);
}

module.exports = { criar, listar, buscarPorId, atualizar, remover };
