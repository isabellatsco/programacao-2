function validarId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ mensagem: 'Identificador inválido.' });
  }

  req.id = id;
  return next();
}

function validarCorpo({ validar, normalizar }) {
  return (req, res, next) => {
    const erros = validar(req.body ?? {});

    if (erros.length > 0) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    req.body = normalizar(req.body);
    return next();
  };
}

module.exports = { validarId, validarCorpo };
