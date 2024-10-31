//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo de advinhação';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um numero de 1 a 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let paragrafo = document.querySelector(tag);
    paragrafo.innerHTML = texto;

    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagem(){
    exibirTextoNaTela('h1', 'Jogo de advinhação');
    exibirTextoNaTela('p', 'Escolha um numero de 1 a 10');
}

exibirMensagem();

function verificarChute() {
    let numero = document.querySelector('input').value;

    //console.log('Botão chute foi clicado');
    //console.log(numeroSecreto);

    //console.log(numero)
    //console.log(numero == numeroSecreto)

    if (numero == numeroSecreto){
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = 'Você descobriu o numero secreto com ' + tentativas + ' ' + palavraTentativas;

        exibirTextoNaTela('h1', 'ACERTOU!');
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');

    } else if (numero > numeroSecreto){        
        exibirTextoNaTela('p', 'O numero é menor!');
    } else {        
        exibirTextoNaTela('p', 'O numero é maior');
    }
    tentativas++;
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);  
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    limparCampo();
    exibirMensagem();
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1
    document.getElementById('reiniciar').setAttribute('disabled', true)
}