const prisma = require('../../lib/prisma');
const listarPaginado = require('../../lib/listar-paginado');

function listar(paginacao) {
  return listarPaginado(prisma.aircraft, { aircraft_id: 'asc' }, paginacao);
}

function buscarPorId(id) {
  return prisma.aircraft.findUnique({ where: { aircraft_id: id } });
}

module.exports = { listar, buscarPorId };
