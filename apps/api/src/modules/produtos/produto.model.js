class Produto {
  constructor(id, nome, qtdeEstoque, preco, _idFornFK = null) {
    this._id = id;
    this.nome = nome;
    this.qtdeEstoque = qtdeEstoque;
    this.preco = preco;
    this._idFornFK = _idFornFK;
  }
}

module.exports = Produto;
