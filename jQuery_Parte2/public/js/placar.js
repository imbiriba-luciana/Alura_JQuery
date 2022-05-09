$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
    $(".placar").slideDown(500);
    /*A função slideDown aceita receber como parâmetro um tempo em milissegundos.
    Neste exemplo, a transição demorará 500 segundos para ser concluída. */
    scrollPlacar(); 
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;
    $("body").animate(
    {
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}
/*Pra saber para onde eu quero dar scroll, é só abrir o DevTools,
e no console dar o comando: o $(".placar").offset() 
Ou então apenas: $(".placar").offset().top
Que vai dar apenas a distância em relação ao topo da página.
Por isso, após descobrir a posição de referência, é só informar numa função,
e dar .ANIMATE, informar a propriedade SCROLLTOP,
então dar os parâmetros (o deslizamento em "px", e os milissegundos)*/

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();

    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
        /* .FADEOUT serve para ir sumindo um elemento diminuindo sua opacidade,
        onde 1000 é o tempo que dura a execução.
        Mas requer o .REMOVE pra ser removido, de fato, mas pra que essa segunda função não seja executada
        antes de FADEOUT terminar, precisa ser controlada por um SETTIMEOUT.
        
        Também existe FADEIN, FADEOUT, e FADETOGGLE*/
    }, 1000);
}

function mostraPlacar() {
    $(".placar").stop().slideToggle(600); 
    /* a função .STOP serve para parar a animação que estiver fazendo no momento e dá sequência.
    Assim, ajuda a controlar melhor as animações, evitando que fiquem encadeadas uma atrás da outra,
    e causem uma usabilidade esquisita*/
}

/*A função .stop() serve para interromper uma animação antes de começar a próxima. 
Quando utilizamos a chamada de .stop() antes de invocar o proxímo .slideUp/Down ,
fazemos com que a animação anterior seja interrompida antes de dar início a próxima,
o que impede que várias animações fiquem encadeadas uma nas outras e crie um menu que fica
subindo e descendo constantemente caso o usuário acione repetidas vezes os eventos. */

/*O jQuery possui a função is que permite consultar uma pseudo class. 
Toda vez que um elemento esta com display diferente de none ele ganha a pseudo classe :visible . 
A função is retorna true caso o elemento esteja visível. Se ele estiver visível,
precisamos escondê-lo e isso é feito através da função hide. Para exibir o elemento, é usada a função show. 

A função toogleClass (não confundir com a função toggle) adiciona uma classe caso ela não exista no elemento. 
Se existir, ela remove a classe.

A função toggle é um atalho para as funções hide e show. 
Quando ela é chamada para um elemento visível, o elemento fica invisível.
Quando é chamada para um elemento invisível, ela torna o elemento visível.

Esta correta! o jQuery possui a função hasClass que retorna true se um elemento possui ou não uma classe. 
Na condição, removemos a classe invisivel caso o elemento já a tenha e a adicionamos caso ele não a tenha. 
Todo esse processo é feito a cada clique do usuário.*/

function sincronizaPlacar(){
/*Lembrando que é sempre bom verificar se o botão está funcionando direito através do console.log*/
    var placar = []; 
    var linhas = $("tbody>tr"); /*Me vê todas as tr que são filhas diretas de tbody */

    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras            
        };

        placar.push(score);

        var dados = {
            placar: placar
        };

        $.post("http://localhost:3000/placar", dados , function() {
            console.log("Placar sincronizado com sucesso");
            $(".tooltip").tooltipster("open"); 
        }).fail(function(){
            $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar"); 
        }).always(function(){ //novo
            setTimeout(function() {
            $(".tooltip").tooltipster("close"); 
        }, 1200);
});

    });
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);

            linha.find(".botao-remover").click(removeLinha);

            $("tbody").append(linha);
        });
    });
}