function notFound(req, res) {
  res.status(404).render('erro', { status: 404, mensagem: 'Página não encontrada.' });
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error.response) {
    const { status, data } = error.response;
    return res.status(status).render('erro', { status, mensagem: data?.mensagem ?? 'Erro na API.' });
  }

  if (error.request) {
    return res.status(502).render('erro', { status: 502, mensagem: 'API indisponível. Verifique se a ap3 está rodando.' });
  }

  console.error(error);
  return res.status(500).render('erro', { status: 500, mensagem: 'Erro interno no servidor.' });
}

module.exports = { notFound, errorHandler };
