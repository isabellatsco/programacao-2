const prisma = require('../../lib/prisma');

async function listar({ pagina, limite, skip, take }) {
  const [total, dados] = await prisma.$transaction([
    prisma.flight.count(),
    prisma.flight.findMany({ orderBy: { flight_id: 'asc' }, skip, take }),
  ]);

  return { pagina, limite, total, dados };
}

function buscarPorId(id) {
  return prisma.flight.findUnique({ where: { flight_id: id }, include: { aircraft: true } });
}

module.exports = { listar, buscarPorId };
