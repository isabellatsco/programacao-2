function notFound(req, res) {
  res.status(404).json({ mensagem: 'Recurso não encontrado.' });
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ mensagem: 'Corpo da requisição não é um JSON válido.' });
  }

  console.error(error);
  return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
}

module.exports = { notFound, errorHandler };
