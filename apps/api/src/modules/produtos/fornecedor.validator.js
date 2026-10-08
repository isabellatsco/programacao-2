function validar({ nome }) {
  const erros = [];

  if (typeof nome !== 'string' || nome.trim() === '') {
    erros.push('"nome" é obrigatório.');
  }

  return erros;
}

function normalizar({ nome }) {
  return { nome: nome.trim() };
}

module.exports = { validar, normalizar };
