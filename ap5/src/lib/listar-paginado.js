const prisma = require('./prisma');

async function listarPaginado(modelo, orderBy, { pagina, limite, skip, take }) {
  const [total, dados] = await prisma.$transaction([
    modelo.count(),
    modelo.findMany({ orderBy, skip, take }),
  ]);

  return { pagina, limite, total, dados };
}

module.exports = listarPaginado;
