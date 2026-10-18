// Importação de pacote para entrada de dados
const input = require('readline-sync');
const api = require('./api');
const Produto = require('../classes/produto');

const LINHA = '--------------------------------------------';
const MAX_OPCOES = 35;

function exibirCabecalho(...linhas) {
  console.log(LINHA);
  linhas.forEach((linha) => console.log(linha));
  console.log(LINHA);
}

function exibirErro(error) {
  const dados = error.response?.data;

  if (!dados) {
    console.log(`ERRO: ${error.message}`);
    return;
  }

  console.log(`ERRO: ${dados.mensagem}`);
  dados.erros?.forEach((erro) => console.log(`  - ${erro}`));
}

function selecionar(itens, cancel) {
  if (itens.length === 0) {
    return -1;
  }

  const nomes = itens.map(({ _id, nome }) => `${_id} - ${nome}`);

  if (itens.length <= MAX_OPCOES) {
    return input.keyInSelect(nomes, 'Digite a opção: ', { cancel }); // CANCEL = -1
  }

  nomes.forEach((nome) => console.log(nome));
  const id = input.questionInt(`Digite o ID (0 = ${cancel}): `);
  return itens.findIndex(({ _id }) => _id === id);
}

function selecionarFornecedor(fornecedores) {
  const opcao = selecionar(fornecedores, 'Sem fornecedor');
  return opcao >= 0 ? fornecedores[opcao]._id : null;
}

//FUNÇÕES CRUD para consumo da API

async function listarFornecedores() {
  exibirCabecalho('                FORNECEDORES', 'ID - NOME');

  try {
    const { data: fornecedores } = await api.get('/fornecedores');
    fornecedores.forEach(({ _id, nome }) => console.log(`${_id} - ${nome}`));
    console.log(LINHA);
  } catch (error) {
    exibirErro(error);
  }
}

async function listarProdutosComFornecedores() {
  exibirCabecalho('         PRODUTOS COM FORNECEDORES', 'ID - NOME (NOME FORNECEDOR)');

  try {
    const [{ data: produtos }, { data: fornecedores }] = await Promise.all([
      api.get('/produtos'),
      api.get('/fornecedores'),
    ]);

    const produtosComFornecedor = produtos.map((produto) => ({
      ...produto,
      nomeForn: fornecedores.find((fornecedor) => fornecedor._id === produto._idFornFK)?.nome ?? 'sem fornecedor',
    }));

    produtosComFornecedor.forEach(({ _id, nome, nomeForn }) => console.log(`${_id} - ${nome} (${nomeForn})`));
    console.log(LINHA);
  } catch (error) {
    exibirErro(error);
  }
}

async function adicionarProduto() {
  const produto = new Produto();
  produto.nome = input.question('Digite o nome do produto: ');
  produto.qtdeEstoque = input.questionInt('Digite a quantidade em estoque: ');
  produto.preco = input.questionFloat('Digite o preço: ');

  try {
    // Lista fornecedores para obter o _id do fornecedor que fornece o produto
    // que está sendo cadastrado
    const { data: fornecedores } = await api.get('/fornecedores');
    console.log('Selecione abaixo o fornecedor para o produto:');
    produto._idFornFK = selecionarFornecedor(fornecedores);

    const { data: criado } = await api.post('/produtos', produto);
    console.log(`Produto "${criado._id} - ${criado.nome}" cadastrado com sucesso!`);
  } catch (error) {
    exibirErro(error);
  }
}

async function listarEditarProdutos() {
  try {
    const { data: produtos } = await api.get('/produtos');

    if (produtos.length === 0) {
      console.log('Nenhum produto cadastrado.');
      return;
    }

    console.log('Selecione abaixo o produto para Alterar/Excluir:');
    exibirCabecalho('                 PRODUTOS', 'ID - NOME');
    const opcaoProduto = selecionar(produtos, 'Sair');

    if (opcaoProduto === -1) {
      console.log('Operação de "Alteração/Exclusão" CANCELADA!');
      return;
    }

    console.clear();
    const { data: produto } = await api.get(`/produtos/${produtos[opcaoProduto]._id}`);
    exibirCabecalho('            DETALHE DO PRODUTO');
    console.log(`ID: ${produto._id}`);
    console.log(`NOME: ${produto.nome}`);
    console.log(`QTDE: ${produto.qtdeEstoque}  PREÇO: ${produto.preco}  ID_FORN: ${produto._idFornFK}`);
    console.log(LINHA);

    const opcao = input.keyInSelect(['Alterar', 'Excluir'], 'Digite a opção: ', { cancel: 'Sair' }); // CANCEL = -1

    switch (opcao) {
      case 0: { // Alterar
        console.log('Pressione ENTER para manter o valor atual.');
        const alterado = new Produto(
          input.question(`NOME [${produto.nome}]: `, { defaultInput: produto.nome }),
          input.questionInt(`QTDE ESTOQUE [${produto.qtdeEstoque}]: `, { defaultInput: String(produto.qtdeEstoque) }),
          input.questionFloat(`PREÇO [${produto.preco}]: `, { defaultInput: String(produto.preco) }),
        );

        const { data: fornecedores } = await api.get('/fornecedores');
        console.log('Selecione o fornecedor:');
        alterado._idFornFK = selecionarFornecedor(fornecedores);

        await api.put(`/produtos/${produto._id}`, alterado);
        console.log('Produto alterado com sucesso!');
        break;
      }
      case 1: { // Excluir
        const excluir = input.keyInYN(`Deseja excluir o produto "${produto._id} - ${produto.nome}" (y=sim / n=não)?`);
        if (excluir) {
          await api.delete(`/produtos/${produto._id}`);
          console.log('Produto excluído com sucesso!');
        }
        break;
      }
      default:
        console.log('Operação de "Alteração/Exclusão" CANCELADA!');
    }
  } catch (error) {
    exibirErro(error);
  }
}

module.exports = {
  listarFornecedores,
  listarProdutosComFornecedores,
  adicionarProduto,
  listarEditarProdutos,
};
