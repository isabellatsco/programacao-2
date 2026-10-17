const repository = require('./aeronaves.repository');

async function listar(req, res) {
  return res.json(await repository.listar(req.paginacao));
}

async function buscarPorId(req, res) {
  const aeronave = await repository.buscarPorId(req.id);
  return aeronave ? res.json(aeronave) : res.status(404).json({ mensagem: 'Aeronave não encontrada.' });
}

module.exports = { listar, buscarPorId };
