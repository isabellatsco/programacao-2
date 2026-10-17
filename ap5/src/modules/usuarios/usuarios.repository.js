const bcrypt = require('bcryptjs');
const prisma = require('../../lib/prisma');

const camposPublicos = { id: true, name: true, login_email: true, user_type: true };

async function comSenhaCriptografada(dados) {
  if (dados.password === undefined) {
    return dados;
  }

  return { ...dados, password: await bcrypt.hash(dados.password, 10) };
}

function naoEncontrado(error) {
  return error.code === 'P2025';
}

async function inserir(dados) {
  return prisma.sys_user.create({ data: await comSenhaCriptografada(dados), select: camposPublicos });
}

function listar() {
  return prisma.sys_user.findMany({ select: camposPublicos, orderBy: { id: 'asc' } });
}

function buscarPorId(id) {
  return prisma.sys_user.findUnique({ where: { id }, select: camposPublicos });
}

function buscarParaLogin(login_email) {
  return prisma.sys_user.findUnique({ where: { login_email } });
}

async function atualizar(id, dados) {
  try {
    return await prisma.sys_user.update({ where: { id }, data: await comSenhaCriptografada(dados), select: camposPublicos });
  } catch (error) {
    if (naoEncontrado(error)) {
      return null;
    }
    throw error;
  }
}

async function remover(id) {
  try {
    await prisma.sys_user.delete({ where: { id } });
    return true;
  } catch (error) {
    if (naoEncontrado(error)) {
      return false;
    }
    throw error;
  }
}

module.exports = { inserir, listar, buscarPorId, buscarParaLogin, atualizar, remover };
