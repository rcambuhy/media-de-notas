const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./party.png" alt"aprovado" />';
const imgReprovado = '<img src="./donkey.png" alt"reprovado" />';
const atividades = [];
const notas = [];

const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'

const notaMinima = parseFloat(prompt('Digite a nota mínima: '));

let linhas = '';

form.addEventListener('submit', function(e) {

    e.preventDefault();
    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
    //chamando as funções na ordem em que elas devem ser executadas//
});

function adicionaLinha () {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if(atividades.includes(inputNomeAtividade.value)) {
        alert(`${inputNomeAtividade.value} já foi inserido(a)`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
    
    
        let linha = '<tr>'
        linha += `<td> ${inputNomeAtividade.value}</td>`;
        linha += `<td> ${inputNotaAtividade.value}</td>`;
        linha += `<td> ${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
            //Operador ternário inputNotaAtividade com o if escrito por "?" e o else escrito por ":"//
        linha += `</tr>`;
    
        linhas += linha;
            //Sem esse comando, quando inserimos a atividade e nota, ao invés de adicionar, ele substitui a última nota adicionada//
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
    //Para limpar os campos após adicionar a atividade - igual o reset do submit//
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody')
    //Colocar o conteúdo dentro da tabela com o document.querySelector//
    corpoTabela.innerHTML = linhas;
    //Inserir os conteúdos dentro de uma tag//
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal;
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal () {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }
    
    return (somaDasNotas / notas.length).toFixed(1);
    //toFixed(1) para a média não aparecer como 5.75555555555, e sim como 5.8//
}