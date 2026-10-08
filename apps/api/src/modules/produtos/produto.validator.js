function validar({ nome, qtdeEstoque, preco, _idFornFK = null }) {
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

  if (_idFornFK !== null && (!Number.isInteger(_idFornFK) || _idFornFK <= 0)) {
    erros.push('"_idFornFK" deve ser null ou um identificador inteiro positivo.');
  }

  return erros;
}

function normalizar({ nome, qtdeEstoque, preco, _idFornFK = null }) {
  return { nome: nome.trim(), qtdeEstoque, preco, _idFornFK };
}

module.exports = { validar, normalizar };
