const TIPOS = ['admin', 'regular'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CAMPOS = ['name', 'login_email', 'password', 'user_type'];

function validarCampos(dados, todosObrigatorios) {
  const erros = [];
  const { name, login_email, password, user_type } = dados;
  const deveValidar = (campo) => todosObrigatorios || dados[campo] !== undefined;

  if (!todosObrigatorios && !CAMPOS.some((campo) => dados[campo] !== undefined)) {
    erros.push(`Informe ao menos um dos campos: ${CAMPOS.join(', ')}.`);
  }

  if (deveValidar('name') && (typeof name !== 'string' || name.trim() === '')) {
    erros.push('"name" é obrigatório.');
  }

  if (deveValidar('login_email') && (typeof login_email !== 'string' || !EMAIL.test(login_email.trim()))) {
    erros.push('"login_email" deve ser um e-mail válido.');
  }

  if (deveValidar('password') && (typeof password !== 'string' || password.length < 5)) {
    erros.push('"password" deve ter pelo menos 5 caracteres.');
  }

  if (deveValidar('user_type') && !TIPOS.includes(user_type)) {
    erros.push(`"user_type" deve ser ${TIPOS.map((tipo) => `"${tipo}"`).join(' ou ')}.`);
  }

  return erros;
}

function normalizar({ name, login_email, password, user_type }) {
  return {
    name: name?.trim(),
    login_email: login_email?.trim().toLowerCase(),
    password,
    user_type,
  };
}

const completo = { validar: (dados) => validarCampos(dados, true), normalizar };
const parcial = { validar: (dados) => validarCampos(dados, false), normalizar };

module.exports = { completo, parcial };
