const prisma = require('../../lib/prisma');
const listarPaginado = require('../../lib/listar-paginado');

function listar(paginacao) {
  return listarPaginado(prisma.passenger, { passenger_id: 'asc' }, paginacao);
}

function buscarPorId(id) {
  return prisma.passenger.findUnique({ where: { passenger_id: id } });
}

module.exports = { listar, buscarPorId };
