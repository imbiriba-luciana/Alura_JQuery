var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");
/*Todo o código foi clusterizado em funções, e as variáveis que não as compõe,
por uma questão de boa prática, é bom isolar para o começo do código, 
pois sendo variáveis de muito uso, é bom deixando-as como variáveis globais */

//$(document).ready(function(){ 
/*a função ".ready" serve para executar o código assim que todo o HTML for carregado, mas pode ser substituído como está abaixo:*/

$(function() {
    atualizaTamanhoFrase();
    iniciaContadores();
    iniciaCronometro();
    iniciaBordas();
    $("#botao-reiniciar").click(reiniciaJogo);
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


function iniciaContadores() {
    campo.on("input", function() {
/*console.log("cliquei no campo") é uma boa forma de identificar se a função anônima
está funcionando direitinho*/
        var conteudo = campo.val();
/* o ".val" dá o valor do input do usuário */
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
/* divide o conteudo em espaços, e dá o tamanho*/
/* S+ busca por espaços vazios e substitui por "".length"*/
        $("#contador-palavras").text(qtdPalavras);
        
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

/* Na intenção de o contador decrescer a partir de quando 
o usuário entrar no campo, vem as linhas abaixo */

function iniciaBordas() {
    var frase = $(".frase").text();
    campo.on("input",function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
    
/* a função ".substr" pega uma parte da frase digitada, 
ou um pedaço de uma string, e requer uma coordenada para saber até que ponto da string ela deve pegar*/
    
    //console.log("Digitado: " + digitado)
    //console.log("Frase Modelo: " + comparavel)
        
        if (digitado == comparavel) { //compara com a variável "comparável" pq a var "frase" seria ela inteira
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}


function iniciaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
/*campo.on("focus", function() { /* A função "focus" no modo "campo.on" escuta toda vez que o cursor aciona o campo
o que significa, que o focus irá solicitar a execução do código abaixo sempre que o 
mouse tocar fora e dentro do campo de texto. Para não prejudicar a contagem correta do cronômetro, pode mudar "on" por "one".
Dessa forma, o focus no campo será considerado apenas uma vez para a execução total do código abaixo! */
    campo.one("focus", function() {
    
        var cronometroID = setInterval(function() {
            tempoRestante--;
            //console.log(tempoRestante);
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}


function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}


function reiniciaJogo() {
        campo.attr("disabled", false);
/*para ele limpar o campo e podermos voltar a digitar nele,
precisa tornar o "disabled" como false, assim ele libera que a leitura do código reinicie!*/
        campo.val(""); /*para zerar o conteúdo do campo! */
        $("#contador-palavras").text(0); /*Para também zerar o contador de palavras */
        $("#contador-caracteres").text(0);
        $("#tempo-digitacao").text(tempoInicial);
        iniciaCronometro();
        campo.toggleClass("campo-desativado");
        campo.removeClass("borda-vermelha");
        campo.removeClass("borda-verde");
    }

/* o ".toggleClass" torna essa linha desnecessária*/

/*As funções mais comuns do jQuery como focus, input, click, tem uma função própria,
que torna o código menor*/


/*campo.attr("disabled", true);
campo.addClass("campo-desativado"); //o ".toggleClass" torna essa linha desnecessária
campo.toggleClass("campo-desativado");
campo.removeClass("borda-vermelha"); //linha desnecessária por causa do toggleClass
campo.removeClass("borda-verde"); //linha desnecessária por causa do toggleClass
inserePlacar();*/

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

/*A função "".toggleClass" faz a ação de colocar e tirar classes,
por isso não precisa mais colocar removeClass separadamente */
      
/* O "focus" garante que o código vai considerar
a partir do momento que o cursos ficou ativo no campo */
/* Abaixo o código para o botão reuniciar, porém mais longo:
$("#botao-reiniciar").on("click", function(){
/*console.log("confirmando que clicou no botao")*/


function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody"); //o ".find" vai descendo a árvore de nós do HTML em busca do que eu especificar dentro dele
    //console.log(tabela);
    var usuario = "lu";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha); //o .append adiciona uma linha no corpo da tabela
                               // tem prepend adiciona antes
}   


function novaLinha(usuario, palavras) {
    var linha = $("<tr>"); //passando elemento HTMl
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
    
    link.append(icone);
    
    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}


function removeLinha(event) { // para tirar o riscado tem que passar o "event" como parâmetro da função, mas isso não está fazendo diferença no funcionamento do código.
    event.preventDefault()
    $(this).parent().parent().remove(); //sobe dois níveis na árvore do HTML
}



