const path = require('path');

const pageNotFound = path.join(__dirname, '..', 'public', 'not_found_404.html');

function notFound(req, res) {
  res.status(404).sendFile(pageNotFound);
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  console.error(error);
  return res.status(500).send('Erro interno no servidor.');
}

module.exports = { notFound, errorHandler };
