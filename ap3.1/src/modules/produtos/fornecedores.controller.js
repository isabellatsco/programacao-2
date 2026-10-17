const { api, mensagensDeErro } = require('../../lib/api');

function lerFormulario({ nome }) {
  return { nome };
}

function renderizarFormulario(res, fornecedor, erros = []) {
  return res.status(erros.length > 0 ? 400 : 200).render('fornecedores/form', { fornecedor, erros });
}

async function renderizarLista(res, erros = []) {
  const { data: fornecedores } = await api.get('/fornecedores');
  return res.status(erros.length > 0 ? 409 : 200).render('fornecedores/lista', { fornecedores, erros });
}

function listar(req, res) {
  return renderizarLista(res);
}

function novo(req, res) {
  return renderizarFormulario(res, { nome: '' });
}

async function criar(req, res) {
  try {
    await api.post('/fornecedores', lerFormulario(req.body));
    return res.redirect('/fornecedores');
  } catch (error) {
    return renderizarFormulario(res, req.body, mensagensDeErro(error));
  }
}

async function editar(req, res) {
  const { data: fornecedor } = await api.get(`/fornecedores/${req.params.id}`);
  return renderizarFormulario(res, fornecedor);
}

async function atualizar(req, res) {
  try {
    await api.put(`/fornecedores/${req.params.id}`, lerFormulario(req.body));
    return res.redirect('/fornecedores');
  } catch (error) {
    return renderizarFormulario(res, { ...req.body, _id: req.params.id }, mensagensDeErro(error));
  }
}

async function excluir(req, res) {
  try {
    await api.delete(`/fornecedores/${req.params.id}`);
    return res.redirect('/fornecedores');
  } catch (error) {
    return renderizarLista(res, mensagensDeErro(error));
  }
}

module.exports = { listar, novo, criar, editar, atualizar, excluir };
