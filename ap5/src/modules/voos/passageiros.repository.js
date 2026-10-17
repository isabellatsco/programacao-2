const prisma = require('../../lib/prisma');

async function listar({ pagina, limite, skip, take }) {
  const [total, dados] = await prisma.$transaction([
    prisma.passenger.count(),
    prisma.passenger.findMany({ orderBy: { passenger_id: 'asc' }, skip, take }),
  ]);

  return { pagina, limite, total, dados };
}

function buscarPorId(id) {
  return prisma.passenger.findUnique({ where: { passenger_id: id } });
}

module.exports = { listar, buscarPorId };
