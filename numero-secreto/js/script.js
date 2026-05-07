const elementoNumerosSorteaveis = document.querySelector('#elemento-numeros-sorteaveis');
const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');

let listaNumerosSorteados = [];

const numeroMinimo = 1;
const numeroMaximo = 5;

let numeroSecreto = obterNumeroAleatorio();
let chute = 0;
let tentativa = 1;

function chutar() {
    chute = parseInt(document.querySelector('#chute').value);

    if (!validarCampos(chute)) return;

    if (chute === numeroSecreto) {
        const palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        const mensagemSucesso = `Parabéns, você acertou o número secreto ${numeroSecreto} com ${tentativa} ${palavraTentativa}`;

        mostrarMensagemNaTela('h1', 'Acertou!');
        mostrarMensagemNaTela('p', mensagemSucesso);

        document.querySelector('#botao-chutar').setAttribute('disabled', true);
        document.querySelector('#botao-reiniciar').removeAttribute('disabled');

        adicionarNumeroNaListaSorteado(chute)
    } else {
        if (chute > numeroSecreto) {
            mostrarMensagemNaTela('p', `O número secreto é menor que ${chute}`);   
        } else {
            mostrarMensagemNaTela('p', `O número secreto é maior que ${chute}`);
        }

        tentativa++;
    }

    limparCampo();
}

function reiniciar() {
    document.querySelector('#botao-chutar').removeAttribute('disabled');
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);

    tentativa = 1;
    numeroSecreto = obterNumeroAleatorio();

    mostrarMensagemNaTelaInicialNaTela();
}

function validarCampos(chute) {
    elementoMensagemAviso.innerHTML = '';

    if (isNaN(chute)) {
        mostrarMensagemNaTelaAvisoNaTela('alerta', 'Preencha corretamente o campo chute');
        return false;
    }

    if (chute < numeroMinimo || chute > numeroMaximo) {
        mostrarMensagemNaTelaAvisoNaTela('alerta', `Digite um número entre ${numeroMinimo} e ${numeroMaximo}, sua opção [${chute}] não satisfaz a solicitação.`);
        return false;
    }

    return true;
}

function mostrarMensagemNaTelaAvisoNaTela(corFundo, texto) {
    elementoMensagemAviso.innerHTML = `
        <span class="conteudo__mensagem conteudo__mensagem-alerta fundo-${corFundo} conteudo__texto">
            ${texto}.
        </span>
    `;
}

function mostrarNumerosSorteaveisNaTela() {
    elementoNumerosSorteaveis.innerHTML = '';

    for (let i = numeroMinimo; i <= numeroMaximo; i++) {
        elementoNumerosSorteaveis.innerHTML += `
            <div class="conteudo__caixa conteudo__subtitulo fundo-alerta" id="numero-sorteavel-${i}">
                ${i <= 9 ? `0${i}` : i}
            </div>
        `;
    }
}

function adicionarNumeroNaListaSorteado(chute) {
    const elemento = document.querySelector(`#numero-sorteavel-${chute}`);
    const elementoClasse = elemento.classList;

    elementoClasse.remove('fundo-alerta');
    elementoClasse.add('fundo-sucesso');
}

function mostrarMensagemNaTela(idElemento, texto) {
    const campo = document.querySelector(idElemento);
    campo.innerHTML = texto;
}

function mostrarMensagemNaTelaInicialNaTela() {
    mostrarMensagemNaTela('h1', 'Número Secreto v1');
    mostrarMensagemNaTela('p', `Digite um número entre ${numeroMinimo} e ${numeroMaximo}`);
}

function obterNumeroAleatorio() {
    let numeroAleatorio = parseInt(Math.random() * numeroMaximo + numeroMinimo);

    if (listaNumerosSorteados.length === numeroMaximo) {
        mostrarNumerosSorteaveisNaTela();
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numeroAleatorio)) {
        return obterNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroAleatorio);
        return numeroAleatorio;
    }
}

function limparCampo() {
    document.querySelector('#chute').value = '';
}

mostrarMensagemNaTelaInicialNaTela();
mostrarNumerosSorteaveisNaTela();
