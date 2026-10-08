class Produto {
  constructor(id, nome, qtdeEstoque, preco) {
    this._id = id;
    this.nome = nome;
    this.qtdeEstoque = qtdeEstoque;
    this.preco = preco;
  }
}

module.exports = Produto;
