const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuariosRepository = require('../usuarios/usuarios.repository');

async function login(req, res) {
  const { login_email, password } = req.body;
  const usuario = await usuariosRepository.buscarParaLogin(login_email);

  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    return res.status(401).json({ mensagem: 'E-mail ou senha inválidos.' });
  }

  const token = jwt.sign({ tipo: usuario.user_type }, process.env.JWT_SECRET, {
    subject: String(usuario.id),
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  });

  const { password: _senha, ...dadosPublicos } = usuario;
  return res.json({ token, usuario: dadosPublicos });
}

module.exports = { login };
