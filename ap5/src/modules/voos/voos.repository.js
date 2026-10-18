const prisma = require('../../lib/prisma');
const listarPaginado = require('../../lib/listar-paginado');

function listar(paginacao) {
  return listarPaginado(prisma.flight, { flight_id: 'asc' }, paginacao);
}

function buscarPorId(id) {
  return prisma.flight.findUnique({ where: { flight_id: id }, include: { aircraft: true } });
}

module.exports = { listar, buscarPorId };
