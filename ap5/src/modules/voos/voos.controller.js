const repository = require('./voos.repository');

async function listar(req, res) {
  return res.json(await repository.listar(req.paginacao));
}

async function buscarPorId(req, res) {
  const voo = await repository.buscarPorId(req.id);
  return voo ? res.json(voo) : res.status(404).json({ mensagem: 'Voo não encontrado.' });
}

module.exports = { listar, buscarPorId };
