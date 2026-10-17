const prisma = require('../../lib/prisma');

async function listar({ pagina, limite, skip, take }) {
  const [total, dados] = await prisma.$transaction([
    prisma.boarding_pass.count(),
    prisma.boarding_pass.findMany({ orderBy: { boarding_pass_id: 'asc' }, skip, take }),
  ]);

  return { pagina, limite, total, dados };
}

function buscarPorId(id) {
  return prisma.boarding_pass.findUnique({ where: { boarding_pass_id: id }, include: { passenger: true, flight: true } });
}

module.exports = { listar, buscarPorId };
