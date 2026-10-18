const { api, mensagensDeErro } = require('../../lib/api');

function numero(valor) {
  return valor === undefined || valor === '' ? null : Number(valor);
}

function lerFormulario({ nome, qtdeEstoque, preco, _idFornFK }) {
  return {
    nome,
    qtdeEstoque: numero(qtdeEstoque),
    preco: numero(preco),
    _idFornFK: numero(_idFornFK),
  };
}

async function renderizarFormulario(res, produto, erros = []) {
  const { data: fornecedores } = await api.get('/fornecedores');
  return res.status(erros.length > 0 ? 400 : 200).render('produtos/form', { produto, fornecedores, erros });
}

async function renderizarLista(res, erros = [], status = 200) {
  const [{ data: produtos }, { data: fornecedores }] = await Promise.all([
    api.get('/produtos'),
    api.get('/fornecedores'),
  ]);

  const nomesFornecedores = new Map(fornecedores.map(({ _id, nome }) => [_id, nome]));
  const produtosComFornecedor = produtos.map((produto) => ({
    ...produto,
    nomeForn: nomesFornecedores.get(produto._idFornFK) ?? '—',
  }));

  return res.status(status).render('produtos/lista', { produtos: produtosComFornecedor, erros });
}

function listar(req, res) {
  return renderizarLista(res);
}

function novo(req, res) {
  return renderizarFormulario(res, { nome: '', qtdeEstoque: '', preco: '', _idFornFK: null });
}

async function criar(req, res) {
  try {
    await api.post('/produtos', lerFormulario(req.body));
    return res.redirect('/produtos');
  } catch (error) {
    return renderizarFormulario(res, req.body, mensagensDeErro(error));
  }
}

async function editar(req, res) {
  const { data: produto } = await api.get(`/produtos/${req.params.id}`);
  return renderizarFormulario(res, produto);
}

async function atualizar(req, res) {
  try {
    await api.put(`/produtos/${req.params.id}`, lerFormulario(req.body));
    return res.redirect('/produtos');
  } catch (error) {
    return renderizarFormulario(res, { ...req.body, _id: req.params.id }, mensagensDeErro(error));
  }
}

async function excluir(req, res) {
  try {
    await api.delete(`/produtos/${req.params.id}`);
    return res.redirect('/produtos');
  } catch (error) {
    return renderizarLista(res, mensagensDeErro(error), error.response.status);
  }
}

module.exports = { listar, novo, criar, editar, atualizar, excluir };
