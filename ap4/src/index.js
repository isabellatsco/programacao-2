// Importação de pacote para entrada de dados
const input = require('readline-sync');
// Importação das Funções CRUD
const {
  listarFornecedores,
  listarProdutosComFornecedores,
  adicionarProduto,
  listarEditarProdutos,
} = require('./lib/funcoes');

// OPÇÕES DO MENU
const opcoesMenu = [
  'Listar Fornecedores',
  'Listar Produtos com Fornecedores',
  'Cadastrar Produto',
  'Listar/Editar Produtos',
];

const acoes = [
  listarFornecedores,
  listarProdutosComFornecedores,
  adicionarProduto,
  listarEditarProdutos,
];

async function main() {
  let sair = false;

  while (!sair) {
    console.clear();
    console.log('---------------------------------------');
    console.log('   BEM-VINDO AO CONTROLE DE ESTOQUE    ');
    console.log('            MENU DE OPÇÕES             ');
    console.log('---------------------------------------');
    const opcao = input.keyInSelect(opcoesMenu, 'Digite a opção: ', { cancel: 'Sair' }); // CANCEL = -1

    if (opcao === -1) {
      sair = input.keyInYN('Deseja sair da aplicação (y=sim / n=não)?');
      continue;
    }

    console.clear();
    await acoes[opcao]();
    input.question('...Pressione ENTER para continuar');
  }
}

main();
