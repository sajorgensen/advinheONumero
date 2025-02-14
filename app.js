//let titulo = document.querySelector ('h1');
//titulo.innerHTML = 'Jogo do numero secreto';    // altera o conteudo do H1

//let paragrafo = document.querySelector ('p');
//paragrafo.innerHTML = 'Escolha um numero de 1 a 10'; // altera o conteudo do P

function mostrarTextoTela (tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

let listaNumerosGerados = [];
let chute = 0;
let numeroAleatorio = gerarNumeroAleatorio();
let tentativas = 1;


mostrarTextoTela ('h1', 'Jogo do número secreto');
mostrarTextoTela ('p', 'Escolha um número de 1 a 10');


console.log(numeroAleatorio);

function gerarNumeroAleatorio(){
    let numeroGerado = Math.floor(Math.random()*10+1);
    if (listaNumerosGerados.includes(numeroGerado)){
        return gerarNumeroAleatorio();
    }else{
        listaNumerosGerados.push(numeroGerado);
        console.log(listaNumerosGerados);
        return numeroGerado;
    }
}

function verificarChute (){
    chute = document.querySelector('input').value;
    console.log(chute, numeroAleatorio);

    if (chute == numeroAleatorio){
        let msgTentativas = (tentativas ==1) ? 'tentativa' : 'tentativas';
        mostrarTextoTela ('h1', `Aeeee cara******! Você acertou em ${tentativas}  ${msgTentativas}`);
        document.getElementById('reiniciar').removeAttribute('disabled');

    }else{
        if (chute > numeroAleatorio){
        mostrarTextoTela ('h1', 'Errrrrroooouuuu =/ o número secreto é menor');
        }else{
        mostrarTextoTela ('h1', 'Errrrrroooouuuu =/ o número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo(){
    chute = document.querySelector('input').value = '';
}


function reiniciarJogo(){
    numeroAleatorio = gerarNumeroAleatorio();
    tentativas = 1;
    mostrarTextoTela ('h1', 'Jogo do número secreto');
    mostrarTextoTela ('p', 'Escolha um número de 1 a 10');
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    limparCampo();
}

