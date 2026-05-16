const elementoAssentosDisponiveis = document.querySelector('#elemento-assentos-disponiveis');
const elementoPrecoCompra = document.querySelector('#elemento-preco-compra');
const elementoPrecoIngresso = document.querySelector('#elemento-preco-ingresso');
const elementoMensagemAviso = document.querySelector('#elemento-mensagem-aviso');
const elementoInformacoes = document.querySelector('#elemento-informacoes');

const quantidadeAssentosDisponiveis = 10;
const precoIngresso = 26;

let listaAssentosEscolhidos = [];
let listaTotalAssentosEscolhidos = [];
let listaCompradores = [];

let precoCompra = 0;

function adicionar() {
    const nomeUsuario = document.querySelector('#nome-usuario').value;

    if (!validarCampos(nomeUsuario)) return;

    mostrarIngressoComprado(nomeUsuario);
    protegerAssentoEscolhido();

    precoCompra = 0;
    mostrarPrecosGeraisNaTela();

    limparCampo();
}

function mostrarIngressoComprado(nomeUsuario) {
    const quantidadeAssentoEscolhido = listaAssentosEscolhidos.length;
    const agruparAssentosEscolhidos = listaAssentosEscolhidos.join(',');
    const elementoAssentoComprado = document.querySelector('#elemento-assento-comprado');

    listaCompradores.push({
        nome: nomeUsuario, 
        quantidade: quantidadeAssentoEscolhido,
        assentos: agruparAssentosEscolhidos
    });

    elementoAssentoComprado.innerHTML = '';

    listaCompradores.forEach((comprador) => {
        elementoAssentoComprado.innerHTML += `
            <p class="conteudo__bloco conteudo__texto">
                Nome: <span class="conteudo__destaque">${comprador.nome}</span>, 
                quantidade: <span class="conteudo__destaque">${comprador.quantidade}</span>, 
                assento(s): <span class="conteudo__destaque">${comprador.assentos}</span>
            </p>
        `;
    });  
}

function limparCampo() {
    document.querySelector('#nome-usuario').value = '';
}

function validarCampos(nomeUsuario) {
    elementoMensagemAviso.innerHTML = '';

    if (nomeUsuario === '') {
        mostrarMensagemAvisoNaTela('alerta', 'Preencha corretamente o campo de usuário');
        return false;
    }

    if (!(listaAssentosEscolhidos.length > 0)) {
        mostrarMensagemAvisoNaTela('alerta', 'Escolha no mínimo um assento');
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

function mostrarAssentosDisponiveisNaTela() {
    for (let i = 1; i <= quantidadeAssentosDisponiveis; i++) {
        elementoAssentosDisponiveis.innerHTML += `
            <div onclick="selecionarAssento(${i})" class="conteudo__caixa conteudo__subtitulo fundo-alerta" id="elemento-assento-${i}">
                ${(i > 0 && i < 10) ? `0${i}` : i}
            </div>
        `;
    }

    mostrarPrecosGeraisNaTela();
}

function executarOperacaoEscolhaIngresso(assento, corFundoRemovida, corFundoAdicionada, acaoAlternada) {
    const elementoAssento = document.querySelector(`#elemento-assento-${assento}`);
    const elementoAssentoClasse = elementoAssento.classList;
    const elementoAssentoEscolhido = document.querySelector('#elemento-assento-escolhido');

    elementoAssentoClasse.remove(corFundoRemovida);
    elementoAssentoClasse.add(corFundoAdicionada);

    elementoAssento.removeAttribute('onclick');
    elementoAssento.setAttribute('onclick', `${acaoAlternada}(${assento})`);

    mostrarPrecosGeraisNaTela();

    const mensagemAssentoEscolhidoNaTela = (textoAlternativo) => {
        elementoAssentoEscolhido.innerHTML = `
            <p class="conteudo__texto conteudo__texto conteudo__destaque">
                ${textoAlternativo}
            </p>
        `;
    }

    if (listaAssentosEscolhidos.length > 0) {
        const agruparItensLista = listaAssentosEscolhidos.join(',');

        mensagemAssentoEscolhidoNaTela(
            `Assento(s) escolhido(s): ${agruparItensLista}`
        );  
    } else {
        mensagemAssentoEscolhidoNaTela('Nenhum assento escolhido');
    }
}

function selecionarAssento(assento) {
    listaAssentosEscolhidos.push(assento);
    listaTotalAssentosEscolhidos.push(assento);
    precoCompra += precoIngresso;

    executarOperacaoEscolhaIngresso(
        assento, 
        'fundo-alerta', 
        'fundo-sucesso', 
        'cancelarEscolha'
    );
}

function cancelarEscolha(assento) {
    const removerAssentoEscolhidoLista = (lista) => {
        const indice = lista.indexOf(assento);

        if (indice != -1) {
            lista.splice(indice, 1);
        }
    }

    removerAssentoEscolhidoLista(listaAssentosEscolhidos);
    removerAssentoEscolhidoLista(listaTotalAssentosEscolhidos);

    precoCompra -= precoIngresso;

    executarOperacaoEscolhaIngresso(
        assento, 
        'fundo-sucesso', 
        'fundo-alerta', 
        'selecionarAssento'
    );
}

function protegerAssentoEscolhido() {
    listaAssentosEscolhidos = [];

    listaTotalAssentosEscolhidos.forEach((assento) => {
        executarOperacaoEscolhaIngresso(
            assento,
            'fundo-sucesso', 
            'fundo-reiniciar', 
            `assentoProtegido(${assento})`
        );
    });
}

function assentoProtegido(assento) {
    mostrarMensagemAvisoNaTela('alerta', `O assento ${assento} já foi escolhido`);
}

function mostrarPrecosGeraisNaTela() {
    elementoPrecoIngresso.textContent = precoIngresso;

    elementoPrecoCompra.textContent = precoCompra;
}

function mostrarMensagemInicialNaTela() {
    elementoInformacoes.innerHTML = `
        <div class="modelo__vertical modelo__centralizado" id="elemento-assento-escolhido">
            <p class="conteudo__texto conteudo__texto conteudo__destaque">Nenhum assento escolhido</p>
        </div>

        <hr class="conteudo__barra"/>

        <div class="modelo__vertical modelo__centralizado" id="elemento-assento-comprado">
            <p class="conteudo__texto">Nenhum ingresso comprado.</p>
        </div>
    `;
}

mostrarAssentosDisponiveisNaTela();
mostrarMensagemInicialNaTela();