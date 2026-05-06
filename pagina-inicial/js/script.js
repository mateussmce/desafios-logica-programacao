const elementoProjetos = document.querySelector('#elemento-projetos');

const listaProjetos = [
    { id: 1, titulo: 'Projeto Base' },
    { id: 2, titulo: 'Número Secreto' },
    { id: 3, titulo: 'Sorteador de Números' },
    { id: 4, titulo: 'Aluguel de Jogos' },
    { id: 5, titulo: 'Carrinho de Compras' },
    { id: 6, titulo: 'Compra de Ingressos' },
    { id: 7, titulo: 'Amigo Secreto' }
];

function mostrarProjetosNaTela() {
    listaProjetos.forEach((projeto) => {
        elementoProjetos.innerHTML += `
            <div class="projeto modelo__vertical modelo__centralizado" id="projeto-${projeto.id}">
                <h2 class="conteudo__subtitulo">${projeto.titulo}</h2>
                <span class="conteudo__tag fundo-sucesso">
                    ${criarTagTitulo(projeto.titulo)}
                </span>
                <a href="${criarTagTitulo(projeto.titulo)}/" target="_blank" class="conteudo__botao fundo-adicionar">
                    Visualizar
                </a>
            </div>
        `;
    });
}

function removerAcentos(texto) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
}


function criarTagTitulo(titulo) {
    const novoTitulo = removerAcentos(titulo);

    return novoTitulo
        .toLowerCase()
        .replace(/\b(de)\b/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

mostrarProjetosNaTela();