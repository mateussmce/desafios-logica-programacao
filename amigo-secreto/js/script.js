const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');
const elementoAmigoAdicionado = document.querySelector('#elemento-amigo-adicionado');
const elementoAmigoSorteado = document.querySelector('#elemento-amigo-sorteado');

let listaAmigosAdicionados = [];

function adicionar() {
    const nomeAmigo = document.querySelector('#nome-amigo').value;

    if (!validarCampos(nomeAmigo)) return;

    inserirAmigosNaLista(nomeAmigo);
    limparCampo();
}

function sortear() {
    alternarItemsLista(listaAmigosAdicionados);

    elementoAmigoSorteado.innerHTML = '';

    for (let i = 0; i < listaAmigosAdicionados.length; i++) {
        if (i === (listaAmigosAdicionados.length - 1)) {
            elementoAmigoSorteado.innerHTML += `
                ${listaAmigosAdicionados[i]} -> ${listaAmigosAdicionados[0]} </br>
            `;
        } else {
            elementoAmigoSorteado.innerHTML += `
                ${listaAmigosAdicionados[i]} -> ${listaAmigosAdicionados[i+1]} </br>
            `;
        }
    }

    document.querySelector('#botao-reiniciar').removeAttribute('disabled');
}

function mostrarMensagemPadraoListaAmigo() {
    return 'Nenhum amigo adicionado até o momento.';
}

function reiniciar() {
    document.querySelector('#botao-sortear').setAttribute('disabled', true);
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);

    listaAmigosAdicionados = [];

    elementoAmigoAdicionado.innerHTML = mostrarMensagemPadraoListaAmigo();
    elementoAmigoSorteado.innerHTML = mostrarMensagemPadraoListaAmigo();
}

function alternarItemsLista(lista) {
    lista.sort(() => Math.random() - 0.5);
}

function inserirAmigosNaLista(nomeAmigo) {
    listaAmigosAdicionados.push(nomeAmigo);

    const tamanhoListaAmigos = listaAmigosAdicionados.length;
    const tamanhoLimiteAmigos = 3;

    if (tamanhoListaAmigos > tamanhoLimiteAmigos) {
        document.querySelector('#botao-sortear').removeAttribute('disabled');
    }

    elementoAmigoAdicionado.innerHTML = `${listaAmigosAdicionados.join(', ')}`;
}

function limparCampo() {
    document.querySelector('#nome-amigo').value = '';
}

function validarCampos(nomeAmigo) {
    elementoMensagemAviso.innerHTML = '';

    if (nomeAmigo === '') {
        mostrarMensagemAvisoNaTela('alerta', 'Preencha corretamente o campo de amigo');
        return false;
    }

    if (!validarExistenciaAmigoNaLista(nomeAmigo)) return;

    return true;
}

function validarExistenciaAmigoNaLista(nomeAmigo) {
    let listaAmigosAdicionadosValidacao = listaAmigosAdicionados.join(',').toLowerCase();
    let nomeAmigoValidacao = nomeAmigo.toLowerCase();

    if (listaAmigosAdicionadosValidacao.includes(nomeAmigoValidacao) && listaAmigosAdicionados.length > 0) {
        mostrarMensagemAvisoNaTela('alerta', `O amigo ${nomeAmigo} já foi adicionado anteriormente. Por favor, escolha outro nome`);
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