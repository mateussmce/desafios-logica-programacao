const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');
const elementoNumerosSorteados = document.querySelector('#elemento-numeros-sorteados');

function sortear() {
    const opcaoEscolhida = parseInt(document.querySelector('#opcao-escolhida').value);
    const numeroMinimo = parseInt(document.querySelector('#numero-minimo').value);
    const numeroMaximo = parseInt(document.querySelector('#numero-maximo').value);
    const quantidade = parseInt(document.querySelector('#numero-quantidade').value);

    let listaNumerosSorteados = [];
    let numeroAleatorio = 0;

    if (!validarCampos(numeroMinimo, numeroMaximo, quantidade, opcaoEscolhida)) return;

    for (let i = 0; i < quantidade; i++) {

        numeroAleatorio = obterNumeroAleatorio(numeroMinimo, numeroMaximo);

        while (listaNumerosSorteados.includes(numeroAleatorio) || !verificarOpcaoEscolhida(opcaoEscolhida, numeroAleatorio)) {
            numeroAleatorio = obterNumeroAleatorio(numeroMinimo, numeroMaximo);
        }

        listaNumerosSorteados.push(numeroAleatorio);
    }

    mostrarMensagemSucessoNaTela(listaNumerosSorteados, numeroMinimo, numeroMaximo);

    document.querySelector('#botao-reiniciar').removeAttribute('disabled');
}

function reiniciar() {
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);

    elementoMensagemAviso.innerHTML = '';

    mostrarMensagemInicialNaTela();
    limparCampo();
}

function validarCampos(numeroMinimo, numeroMaximo, quantidade, opcaoEscolhida) {
    elementoMensagemAviso.innerHTML = '';

    if (isNaN(numeroMinimo) || isNaN(numeroMaximo) || isNaN(quantidade)) {
        mostrarMensagemAvisoNaTela(
            'alerta', 'Preencha corretamente todos os campos. Existe a possibilidade de que um valor informado não seja realmente um número'
        );
        return false;
    }

    if (!validarLimiteQuantidade(numeroMinimo, numeroMaximo, quantidade, opcaoEscolhida)) return;

    return true;
}

function validarLimiteQuantidade(numeroMinimo, numeroMaximo, quantidade, opcaoEscolhida) {
    const diferencaEntreValores = numeroMaximo - numeroMinimo + 1;
    const numeroLimiteQuantidade = parseInt(diferencaEntreValores / 2);

    const mensagemVerificarLimiteQuantidade = (quantidadeReferencia) => {
        return `A quantidade informada (${quantidade}) excede o limite permitido (${quantidadeReferencia}). Por favor, insira um valor igual ou inferior a esse limite`;
    }

    if (opcaoEscolhida === 1 && quantidade > diferencaEntreValores) {
        mostrarMensagemAvisoNaTela(
            'alerta',
            mensagemVerificarLimiteQuantidade(diferencaEntreValores)
        );
        return false;
    }

    if (opcaoEscolhida !== 1 && quantidade > numeroLimiteQuantidade) {
        mostrarMensagemAvisoNaTela(
            'alerta',
            mensagemVerificarLimiteQuantidade(numeroLimiteQuantidade)
        );
        return false;
    }

    return true;
}

function verificarOpcaoEscolhida(opcaoEscolhida, numeroAleatorio) {
    if (opcaoEscolhida === 2) {
        return numeroAleatorio % 2 == 0;
    }
    
    if (opcaoEscolhida === 3) {
        return numeroAleatorio % 2 !== 0;
    }

    return true;
}

function mostrarMensagemSucessoNaTela(listaNumerosSorteados, numeroMinimo, numeroMaximo) {
    const compararNumeros = (a, b) => a - b;

    listaNumerosSorteados.sort(compararNumeros);

    mostrarMensagemAvisoNaTela(
        'sucesso',
        `Números sorteados: ${listaNumerosSorteados.join(',')}`
    );

    mostrarNumerosSorteadosNaTela(numeroMinimo, numeroMaximo, listaNumerosSorteados);
}

function mostrarNumerosSorteadosNaTela(numeroMinimo, numeroMaximo, listaNumerosSorteados) {
    elementoNumerosSorteados.innerHTML = '';

    const verificarSorteado = (listaNumerosSorteados, item) =>
        listaNumerosSorteados.includes(item) ? 'sucesso' : 'alerta';

    for (let i = numeroMinimo; i <= numeroMaximo; i++) {
        elementoNumerosSorteados.innerHTML += `
            <div class="conteudo__caixa conteudo__subtitulo fundo-${verificarSorteado(listaNumerosSorteados, i)}">
                ${(i > 9 || i < 0) ? i : `0${i}` }
            </div>
        `;
    }
}

function mostrarMensagemNaTela(elementoIdentificador, mensagem) {
    const campo = document.querySelector(elementoIdentificador);
    campo.innerHTML = mensagem;
}

function mostrarMensagemInicialNaTela() {
    mostrarMensagemNaTela(
        '#elemento-numeros-sorteados',
        `<p class="conteudo__texto conteudo__destaque">Nenhum sorteio realizado até o momento.</p>`
    );
}

function obterNumeroAleatorio(numeroMinimo, numeroMaximo) {
    return parseInt(Math.random() * (numeroMaximo - numeroMinimo + 1) + numeroMinimo);
}

function mostrarMensagemAvisoNaTela(corFundo, texto) {
    elementoMensagemAviso.innerHTML = `
        <span class="conteudo__mensagem conteudo__mensagem-alerta fundo-${corFundo} conteudo__texto">
            ${texto}.
        </span>
    `;
}

function limparCampo() {
    document.querySelector('#opcao-escolhida').value = '1';
    document.querySelector('#numero-minimo').value = '';
    document.querySelector('#numero-maximo').value = '';
    document.querySelector('#numero-quantidade').value = '';
}

mostrarMensagemInicialNaTela();