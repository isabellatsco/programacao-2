const LIMITE_PADRAO = 50;
const LIMITE_MAXIMO = 10000;

function paginar(req, res, next) {
  const pagina = req.query.pagina === undefined ? 1 : Number(req.query.pagina);
  const limite = req.query.limite === undefined ? LIMITE_PADRAO : Number(req.query.limite);

  if (!Number.isInteger(pagina) || pagina < 1 || !Number.isInteger(limite) || limite < 1 || limite > LIMITE_MAXIMO) {
    return res.status(400).json({ mensagem: `"pagina" deve ser >= 1 e "limite" entre 1 e ${LIMITE_MAXIMO}.` });
  }

  req.paginacao = { pagina, limite, skip: (pagina - 1) * limite, take: limite };
  return next();
}

module.exports = { paginar };
