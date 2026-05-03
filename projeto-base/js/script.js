const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');

function adicionar() {
    const quantidade = parseInt(document.querySelector('#quantidade').value);
    const opcaoEscolhida = parseInt(document.querySelector('#opcao-escolhida').value);

    if (!validarCampos(quantidade, opcaoEscolhida)) return;

    mostrarMensagemAvisoNaTela(
        'sucesso', 
        `Quantidade: ${quantidade} / Opção escolhida: ${opcaoEscolhida}`
    );

    limparCampo();

    document.querySelector('#botao-sortear').removeAttribute('disabled');
    document.querySelector('#botao-reiniciar').removeAttribute('disabled');
}

function reiniciar() {
    elementoMensagemAviso.innerHTML = '';

    document.querySelector('#botao-sortear').setAttribute('disabled', true);
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);
}

function limparCampo() {
    document.querySelector('#quantidade').value = '';
    document.querySelector('#opcao-escolhida').value = '1';
}

function validarCampos(quantidade, opcaoEscolhida) {
    if (isNaN(quantidade) || isNaN(opcaoEscolhida)) {
        mostrarMensagemAvisoNaTela('alerta', 'Preencha corretamente todos os campos');
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