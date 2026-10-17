const repository = require('./usuarios.repository');

function naoEncontrado(res) {
  return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
}

async function criar(req, res) {
  const usuario = await repository.inserir(req.body);
  return res.status(201).json(usuario);
}

async function listar(req, res) {
  return res.json(await repository.listar());
}

async function buscarPorId(req, res) {
  const usuario = await repository.buscarPorId(req.id);
  return usuario ? res.json(usuario) : naoEncontrado(res);
}

async function atualizar(req, res) {
  const { user_type } = req.body;
  if (req.usuario.tipo !== 'admin' && user_type !== undefined && user_type !== req.usuario.tipo) {
    return res.status(403).json({ mensagem: 'Apenas administradores podem alterar o tipo de usuário.' });
  }

  const usuario = await repository.atualizar(req.id, req.body);
  return usuario ? res.json(usuario) : naoEncontrado(res);
}

async function remover(req, res) {
  return (await repository.remover(req.id)) ? res.status(204).end() : naoEncontrado(res);
}

module.exports = { criar, listar, buscarPorId, atualizar, remover };
