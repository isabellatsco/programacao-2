const repository = require('./produtos.repository');
const fornecedoresRepository = require('./fornecedores.repository');

function naoEncontrado(res) {
  return res.status(404).json({ mensagem: 'Produto não encontrado.' });
}

function fornecedorInexistente(req, res) {
  const { _idFornFK } = req.body;
  if (_idFornFK !== null && !fornecedoresRepository.buscarPorId(_idFornFK)) {
    res.status(400).json({ mensagem: 'Fornecedor informado não existe.' });
    return true;
  }
  return false;
}

function criar(req, res) {
  if (fornecedorInexistente(req, res)) return;

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
  if (fornecedorInexistente(req, res)) return;

  const produto = repository.atualizar(req.id, req.body);
  return produto ? res.json(produto) : naoEncontrado(res);
}

function remover(req, res) {
  return repository.remover(req.id) ? res.status(204).end() : naoEncontrado(res);
}

module.exports = { criar, listar, buscarPorId, atualizar, remover };
