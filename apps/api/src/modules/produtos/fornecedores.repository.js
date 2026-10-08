const Fornecedor = require('./fornecedor.model');

const fornecedores = new Map();
let proximoId = 1;

function inserir({ nome }) {
  const fornecedor = new Fornecedor(proximoId, nome);
  fornecedores.set(fornecedor._id, fornecedor);
  proximoId += 1;
  return fornecedor;
}

function listar() {
  return [...fornecedores.values()];
}

function buscarPorId(id) {
  return fornecedores.get(id) ?? null;
}

function atualizar(id, { nome }) {
  const fornecedor = fornecedores.get(id);
  if (!fornecedor) {
    return null;
  }

  fornecedor.nome = nome;

  return fornecedor;
}

function remover(id) {
  return fornecedores.delete(id);
}

inserir({ nome: 'Mundo da Construção' });
inserir({ nome: 'Cimento & Cia' });

module.exports = { inserir, listar, buscarPorId, atualizar, remover };
