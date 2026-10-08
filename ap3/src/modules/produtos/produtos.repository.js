const Produto = require('./produto.model');

const produtos = new Map();
let proximoId = 1;

function inserir({ nome, qtdeEstoque, preco, _idFornFK }) {
  const produto = new Produto(proximoId, nome, qtdeEstoque, preco, _idFornFK);
  produtos.set(produto._id, produto);
  proximoId += 1;
  return produto;
}

function listar() {
  return [...produtos.values()];
}

function buscarPorId(id) {
  return produtos.get(id) ?? null;
}

function atualizar(id, { nome, qtdeEstoque, preco, _idFornFK }) {
  const produto = produtos.get(id);
  if (!produto) {
    return null;
  }

  produto.nome = nome;
  produto.qtdeEstoque = qtdeEstoque;
  produto.preco = preco;
  produto._idFornFK = _idFornFK;

  return produto;
}

function remover(id) {
  return produtos.delete(id);
}

inserir({ nome: 'Tijolo', qtdeEstoque: 1000, preco: 0.9, _idFornFK: 1 });
inserir({ nome: 'Cimento', qtdeEstoque: 200, preco: 25.0, _idFornFK: 2 });

module.exports = { inserir, listar, buscarPorId, atualizar, remover };
