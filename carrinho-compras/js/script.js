const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');
const elementoProdutos = document.querySelector('#elemento-produtos');
const elementoOpcaoProdutos = document.querySelector('#produtos');
const elementoPreco = document.querySelector('#elemento-preco');

let precoGeral = 0;

const listaProdutos = [
    { id: 1, nome: 'Celular', quantidade: 6, preco: 1400 },
    { id: 2, nome: 'Notebook', quantidade: 12, preco: 5400 },
    { id: 3, nome: 'Tablet', quantidade: 4, preco: 2400 }
];

function adicionar() {
    const quantidade = parseInt(document.querySelector('#quantidade').value);
    const opcaoEscolhida = elementoOpcaoProdutos.value; 

    const SEPARADOR_STRING = opcaoEscolhida.split(' ');

    const nomeProduto = SEPARADOR_STRING[3];
    const precoProduto = parseInt(SEPARADOR_STRING[1]);
    const codigoProduto = parseInt(SEPARADOR_STRING[5]);

    if (!validarCampos(quantidade, opcaoEscolhida)) return;

    inserirProdutoNoCarrinho(quantidade, nomeProduto, precoProduto, codigoProduto);
    limparCampos();
}

function inserirProdutoNoCarrinho(quantidade, nomeProduto, precoProduto, codigoProduto) {
    const validarQuantidade = quantidade > 1 ? 'quantidades disponíveis' : 'quantidade disponível';

    listaProdutos.forEach((produto) => {
        if (produto.id === codigoProduto) {

            if (quantidade > produto.quantidade) {
                mostrarMensagemAvisoNaTela('alerta', `Não há ${quantidade} ${validarQuantidade} para o produto ${nomeProduto}`);
                return false;
            }

            if (quantidade <= produto.quantidade) {
                produto.quantidade -= quantidade;
                mostrarProdutosNaTela();
                atualizarPrecoGeral(quantidade, precoProduto);
            }
        }
    });
}

function atualizarPrecoGeral(quantidade, precoProduto) {
    const precoPorProduto = quantidade * precoProduto;

    precoGeral += precoPorProduto;
    elementoPreco.textContent = precoGeral;
}

function limparCampos() {
    document.querySelector('#quantidade').value = '';
    document.querySelector('#produtos').value = '';
}

function validarCampos(quantidade, opcaoEscolhida) {
    elementoMensagemAviso.innerHTML = '';

    if (isNaN(quantidade) || opcaoEscolhida === '') {
        mostrarMensagemAvisoNaTela('alerta', 'Preencha corretamente todos os campos');
        return false;
    }

    if (quantidade <= 0) {
        mostrarMensagemAvisoNaTela('alerta', `Valores menores ou iguais a zero não são permitidos; portanto, [${quantidade}] não é um valor válido`);
        return false;
    }

    return true;
}

function mostrarMensagemAvisoNaTela(corFundo, texto) {
    elementoMensagemAviso.innerHTML = `
        <span class="conteudo__mensagem conteudo__mensagem-alerta fundo-${corFundo} conteudo__texto">
            ${texto}.
        </span>
    `;
}

function mostrarProdutosNaTela() {
    elementoProdutos.innerHTML = '';
    elementoOpcaoProdutos.innerHTML = `<option value="">Escolha uma opção</option>`;

    listaProdutos.forEach((produto) => {
        elementoProdutos.innerHTML += `
            <div class="produto modelo__vertical modelo__centralizado" id="${produto.id}">
                <p class="conteudo__texto">${produto.nome}</p>
                <span 
                    class="conteudo__tag fundo-${verificarQuantidadeProduto(produto.quantidade)}">
                    Quantidade: ${produto.quantidade}
                </span>
                <p class="conteudo__texto">R$ ${produto.preco}</p>
            </div>
        `;

        if (produto.quantidade > 0) {
            elementoOpcaoProdutos.innerHTML += `
                <option value="R$ ${produto.preco} - ${produto.nome} - ${produto.id}">
                    R$ ${produto.preco} - ${produto.nome}
                </option>
            `;
        }
    });
}

function verificarQuantidadeProduto(quantidade) {
    return quantidade > 0 ? 'sucesso' : 'alerta';
}

mostrarProdutosNaTela();