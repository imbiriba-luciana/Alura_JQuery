var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();
/*Todo o código foi clusterizado em funções, e as variáveis que não as compõe,
por uma questão de boa prática, é bom isolar para o começo do código, 
pois sendo variáveis de muito uso, é bom deixando-as como variáveis globais */

$(document).ready(function(){ /* a função ".ready" serve para executar o código assim que todo o HTML for carregado*/
    atualizaTamanhoFrase();
    iniciaContadores();
    iniciaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo)
}); 

function atualizaTamanhoFrase(){
var frase = $(".frase").text(); 
/* 
- "$(".frase")"" significa seleciona o meu elemento, ".text()" e pega o texto que tá lá dentro, e salva na variável frase. =D 
- Poderia usar o document.querySelector, mas o jQuery existe justamente para encurtar o código
- É mais comum ver o jQuery substituído pelo símbolo $ 
- Sem a função .text() ele executa, mas não mostra o conteúdo da frase */
var numPalavras = frase.split(" ").length; 
/* 
- A função split quebra uma string naquilo que eu colocar entre as aspas do parêntese.
Então nesse caso, vai quebrar a minha string em espaços. */
var tamanhoFrase = $("#tamanho-frase");
/*
- Usa jQuery para selecionar o elemento id, que neste caso é #tamanho-frase
E usa a função .tex() para ela dar o conteúdo textual contido nesta id.
Mas, uma vez, sendo usada abaixo para retonar o numPalavras do conteúdo textual da variável tamanhoFrase, não precisa usar acima */
/* 
- A função .text() tem esta dupla função, 
nos retornar o valor textual do elemento caso seja chamada sem parâmetro ou alterar o valor de texto do elemento
caso seja chamada com uma string como parâmetro. */
tamanhoFrase.text(numPalavras);
/* Console.log(tamanhoFrase) /* é bom carregar no console para ver se o código está carregando direito*/
}


function iniciaContadores(){
campo.on("input", function() {
/*console.log("cliquei no campo") é uma boa forma de identificar se a função anônima
está funcionando direitinho*/
var conteudo = campo.val();
/* o ".val" dá o valor do input do usuário */
var qtdPalavras = conteudo.split(/\S+/).length-1;
/* divide o conteudo em espaços, e dá o tamanho*/
/* S+ busca por espaços vazios e substitui por "".length"*/
$("#contador-palavras").text(qtdPalavras);
var qtdCaracteres = conteudo.length;
$("#contador-caracteres").text(qtdCaracteres);
});
}

/* Na intenção de o contador decrescer a partir de quando 
o usuário entrar no campo, vem as linhas abaixo */

function iniciaCronometro() {
var tempoRestante = $("#tempo-digitacao").text();
/*campo.on("focus", function() { /* A função "focus" no modo "campo.on" escuta toda vez que o cursor aciona o campo
o que significa, que o focus irá solicitar a execução do código abaixo sempre que o 
mouse tocar fora e dentro do campo de texto. Para não prejudicar a contagem correta do cronômetro, pode mudar "on" por "one".
Dessa forma, o focus no campo será considerado apenas uma vez para a execução total do código abaixo! */
campo.one("focus", function() {
    var cronometroID = setInterval(function(){
        tempoRestante--
        console.log(tempoRestante);
        $("#tempo-digitacao").text(tempoRestante);
        if(tempoRestante < 1) {
        campo.attr("disabled", true);
        clearInterval(cronometroID);
        /**a função ".attr()" funciona como .text que 
         * é capaz de mudar o conteúdo de dentro de dentro de uma variável*/
        /* a função "clearInterval" serve para limpar o intervalo de tempo discriminado por "setInterval"
        e ela precisa receber uma "id" do setInterval de interesse.
        Por isso, a função setInterval acima foi atribuída à variável "cronometroID".
        Dessa forma, o "clearInterval" vai bloquear o cronômetro quando ele chega no zero */
        
        /*campo.css("background-color", "lightgrey");
        A função ".css" do jQuery permite mudar uma propriedade do arquivo CSS.
        Mas isso iria modificar o CSS meio que "na marra".
        Por isso, existe tb a forma abaixo: */
        
        campo.addClass("campo-desativado");
        }
    }, 1000);
/* O "focus" garante que o código vai considerar
a partir do momento que o cursos ficou ativo no campo */
/* Abaixo o código para o botão reuniciar, porém mais longo:
$("#botao-reiniciar").on("click", function(){
    /*console.log("confirmando que clicou no botao")*/
});
}

function reiniciaJogo(){
        campo.attr("disabled", false) /*para ele limpar o campo e podermos voltar a digitar nele,
        precisa tornar o "disabled" como false, assim ele libera que a leitura do código reinicie!*/
        campo.val(""); /*para zerar o conteúdo do campo! */
        $("#contador-palavras").text(0); /*Para também zerar o contador de palavras */
        $("#contador-caracteres").text(0);
        $("#tempo-digitacao").text(tempoInicial);
        iniciaCronometro();
    }
/*As funções mais comuns do jQuery como focus, input, click, tem uma função própria,
que torna o código menor*/

