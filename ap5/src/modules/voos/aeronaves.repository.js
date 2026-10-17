const prisma = require('../../lib/prisma');

async function listar({ pagina, limite, skip, take }) {
  const [total, dados] = await prisma.$transaction([
    prisma.aircraft.count(),
    prisma.aircraft.findMany({ orderBy: { aircraft_id: 'asc' }, skip, take }),
  ]);

  return { pagina, limite, total, dados };
}

function buscarPorId(id) {
  return prisma.aircraft.findUnique({ where: { aircraft_id: id } });
}

module.exports = { listar, buscarPorId };
