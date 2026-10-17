function validar({ login_email, password }) {
  const erros = [];

  if (typeof login_email !== 'string' || login_email.trim() === '') {
    erros.push('E-mail é obrigatório.');
  }

  if (typeof password !== 'string' || password === '') {
    erros.push('Senha é obrigatória.');
  }

  return erros;
}

function normalizar({ login_email, password }) {
  return { login_email: login_email.trim().toLowerCase(), password };
}

module.exports = { validar, normalizar };
