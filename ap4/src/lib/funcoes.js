// Importação de pacote para entrada de dados
const input = require('readline-sync');
const api = require('./api');
const Produto = require('../classes/produto');

const LINHA = '--------------------------------------------';

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

function selecionarFornecedor(fornecedores) {
  const nomes = fornecedores.map(({ _id, nome }) => `${_id} - ${nome}`);
  const opcao = input.keyInSelect(nomes, 'Digite a opção: ', { cancel: 'Sem fornecedor' }); // CANCEL = -1
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
  produto.qtdeEstoque = parseInt(input.question('Digite a quantidade em estoque: '));
  produto.preco = parseFloat(input.question('Digite o preço: '));

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

    console.log('Selecione abaixo o produto para Alterar/Excluir:');
    exibirCabecalho('                 PRODUTOS', 'ID - NOME');
    const opcaoProduto = input.keyInSelect(
      produtos.map(({ _id, nome }) => `${_id} - ${nome}`),
      'Digite a opção: ',
      { cancel: 'Sair' },
    ); // CANCEL = -1

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
          parseInt(input.question(`QTDE ESTOQUE [${produto.qtdeEstoque}]: `, { defaultInput: String(produto.qtdeEstoque) })),
          parseFloat(input.question(`PREÇO [${produto.preco}]: `, { defaultInput: String(produto.preco) })),
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
