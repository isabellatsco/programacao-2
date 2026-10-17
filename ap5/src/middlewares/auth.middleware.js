const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const [esquema, token] = (req.headers.authorization ?? '').split(' ');

  if (esquema !== 'Bearer' || !token) {
    return res.status(401).json({ mensagem: 'Token não informado.' });
  }

  try {
    const { sub, tipo } = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = { id: Number(sub), tipo };
    return next();
  } catch {
    return res.status(401).json({ mensagem: 'Token inválido ou expirado.' });
  }
}

function somenteAdmin(req, res, next) {
  if (req.usuario.tipo !== 'admin') {
    return res.status(403).json({ mensagem: 'Acesso restrito a administradores.' });
  }

  return next();
}

function adminOuProprio(req, res, next) {
  if (req.usuario.tipo !== 'admin' && req.usuario.id !== req.id) {
    return res.status(403).json({ mensagem: 'Usuário só pode acessar os próprios dados.' });
  }

  return next();
}

module.exports = { autenticar, somenteAdmin, adminOuProprio };
