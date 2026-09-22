const Produto = require('../models/produto');

const produtos = new Map();
let proximoId = 1;

function inserir({ nome, qtdeEstoque, preco }) {
  const produto = new Produto(proximoId, nome, qtdeEstoque, preco);
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

function atualizar(id, { nome, qtdeEstoque, preco }) {
  const produto = produtos.get(id);
  if (!produto) {
    return null;
  }

  produto.nome = nome;
  produto.qtdeEstoque = qtdeEstoque;
  produto.preco = preco;
  
  return produto;
}

function remover(id) {
  return produtos.delete(id);
}

inserir({ nome: 'Tijolo', qtdeEstoque: 1000, preco: 0.9 });
inserir({ nome: 'Cimento', qtdeEstoque: 200, preco: 25.0 });

module.exports = { inserir, listar, buscarPorId, atualizar, remover };
