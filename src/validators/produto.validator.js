function validarProduto({ nome, qtdeEstoque, preco }) {
  const erros = [];

  if (typeof nome !== 'string' || nome.trim() === '') {
    erros.push('"nome" é obrigatório.');
  }

  if (!Number.isInteger(qtdeEstoque) || qtdeEstoque < 0) {
    erros.push('"qtdeEstoque" deve ser inteiro e maior ou igual a zero.');
  }

  if (typeof preco !== 'number' || !Number.isFinite(preco) || preco < 0) {
    erros.push('"preco" deve ser um número maior ou igual a zero.');
  }

  return erros;
}

function normalizarProduto({ nome, qtdeEstoque, preco }) {
  return { nome: nome.trim(), qtdeEstoque, preco };
}

module.exports = { validarProduto, normalizarProduto };
