const repository = require('./passageiros.repository');

async function listar(req, res) {
  return res.json(await repository.listar(req.paginacao));
}

async function buscarPorId(req, res) {
  const passageiro = await repository.buscarPorId(req.id);
  return passageiro ? res.json(passageiro) : res.status(404).json({ mensagem: 'Passageiro não encontrado.' });
}

module.exports = { listar, buscarPorId };
