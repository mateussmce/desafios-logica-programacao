const elementoJogos = document.querySelector('#elemento-jogos');
const elementoJogosAlugados = document.querySelector('#elemento-jogos-alugados');

const listaJogos = [
    { id: 1, titulo: 'Mortal Kombat', imgTitle: 'nMzj0zKb/logo-mortal-kombat.png' },
    { id: 2, titulo: 'Street Fighter II', imgTitle: 'MDVWbjdr/logo-street-fighter.png' },
    { id: 3, titulo: 'GTA 5', imgTitle: 'YFdLyxQ6/logo-gta5.png' }
];

let jogosAlugados = 0;

function alugar(jogoEscolhido) {
    const jogo = elementoJogos.querySelector(`#jogo-${jogoEscolhido}`);

    const imagemJogo = jogo.querySelector('img');
    const imagemJogoClasse = imagemJogo.classList;

    const tituloJogo = jogo.querySelector('h2');

    const tagJogo = jogo.querySelector('span');
    const tagJogoClasse = tagJogo.classList;

    const botaoJogo = jogo.querySelector('button');
    const classeBotaoJogo = botaoJogo.classList;

    if (classeBotaoJogo.contains('fundo-adicionar')) {
        // Imagem
        imagemJogoClasse.add('conteudo__opacidade');

        // Tag Título
        tagJogoClasse.remove('fundo-sucesso');
        tagJogoClasse.add('fundo-alerta');
        tagJogo.textContent = 'Indisponível';

        // Botão
        classeBotaoJogo.remove('fundo-adicionar');
        classeBotaoJogo.add('fundo-reiniciar');

        jogosAlugados++;
    } else {
        if (!validarDevolucao(tituloJogo)) return;

        // Imagem
        imagemJogoClasse.remove('conteudo__opacidade');

        // Tag Título
        tagJogoClasse.remove('fundo-alerta');
        tagJogoClasse.add('fundo-sucesso');
        tagJogo.textContent = 'Disponível';

        // Botão
        classeBotaoJogo.remove('fundo-reiniciar');
        classeBotaoJogo.add('fundo-adicionar');
        jogosAlugados--;
    }

    atualizarJogosAlugados();
}

function atualizarJogosAlugados() {
    elementoJogosAlugados.textContent = jogosAlugados;
}

function validarDevolucao(tituloJogo) {
    const tituloFormatadoEmTexto = tituloJogo.textContent;
    const nomeJogoEscolhido = tituloFormatadoEmTexto;
    const mensagemDevolucao = prompt(`Digite '${tituloFormatadoEmTexto}' para devolver o jogo:`);
    const verificarDevolucao = nomeJogoEscolhido === mensagemDevolucao ? 'sim' : 'não';
    
    alert(`Você escolheu (${verificarDevolucao}) para devolver o jogo ${nomeJogoEscolhido}`);

    if (nomeJogoEscolhido !== mensagemDevolucao) {
        return false;
    }

    return true;
}

function mostrarJogosNaTela() {
    listaJogos.forEach((jogo) => {
        elementoJogos.innerHTML += `
            <div class="jogo modelo__vertical modelo__centralizado" id="jogo-${jogo.id}">
                <img src="https://i.ibb.co/${jogo.imgTitle}" alt="Logo - ${jogo.titulo}" class="conteudo__imagem"/>

                <h2 class="conteudo__texto">${jogo.titulo}</h2>
                <span class="conteudo__tag fundo-sucesso">Disponível</span>
                <button onclick="alugar(${jogo.id})" class="conteudo__botao fundo-adicionar">
                    Alugar
                </button>
            </div>
        `;
    });
}

mostrarJogosNaTela();