$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria() {
	$("#spinner").toggle();
    /*o SPINNER (barra giratória de carregamento) vai ser uma barra de carregamento,
        que será um feedback visual para o usuário saber que está acontecendo alguma coisa quando ele clica no botão */
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function(){ /*Função do jQuery para lidar com a requisição AJAX quando ela falhar. */
    	$("#erro").toggle();
    	setTimeout(function(){ /*o SETTIMEOUT é para a msg de erro aparecer, mas depois sumir, não ficar direto*/
    		$("#erro").toggle(); /*Para mostrar a msg de erro somente se a requisição falhar*/
    	},1500);
    })
    .always(function(){
    	$("#spinner").toggle(); 
    /*na intenção de esconder o spinner quando a requisição terminar,
    e considerando que a função "$.get" tem dois possíveis resultados (a requisição dar certo ou falhar),
    a função ".always" do jQuery sempre vai executar o que for passado a ela, independente de o resultado da função get
    ter dado certo ou errado. Então pode passar a função de esconder o spinner a ela através do toggle */
    });
}

function trocaFraseAleatoria(data) {
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

/*o AJAX vai buscar informações em um servidor, onde pra essa finalidade aqui terá frases pré-prontas,
para que as frases possam ficar mudando dentro do jogo. 
o AJAX faz uma requisição ao servidor de modo assíncrona.
Assim, toda vez que o jogador recarregar a página, o AJAX busca uma nova frase.
De modo assíncrona significa que não irá prejudicar o fluxo da aplicação (???) */

/*O projeto precisa, então, de uma outra pasta além da "public", que será a "servidor".
Essa vai conter o servidor em NODE.JS, que será instanciado na máquina local.
E ele serve para levantar o servidor, que por sua vez passará a segurar a aplicação.

Ou seja, o site passará a funcionar a partir de um servidor,
onde o "principal.html" será hosteado e carregado desse servidor,
onde tb estão as frases salvas no backend do servidor para o "principa.html.

Por debaixo dos panos, o navegador utiliza um verbo do HTTP para buscar os dados e exibí-los na tela.
Contudo, se fizermos isso em nossa aplicação Alura Typer nossa página recarregará e nossa aplicação desaparecerá.
É por isso que ao invés de pedirmos esses dados através do navegador, pedimos através do JavaScript,
mais notadamente através de uma requisição ajax. Essa requisição não recarrega a tela,
contudo é responsabilidade do programador obter os dados retornados e atualizar a página programaticamente
através de JavaScript sem perturbar o fluxo da aplicação.

Ou seja, o jQuery também serve de ponte de ligação do navegador com algum servidor.*/

/*Como vamos trabalhar bastante com requisições AJAX neste módulo, precisamos levantar nosso servidor web. 
Fazemos isto navegando pelo terminal até a pasta /alura-typer/servidor/ e inicializando o servidor com o comando npm start. 
O terminal irá congelar, mas isto é normal, só significa que ele está rodando corretamente,
devemos deixá-lo aberto enquanto estamos utilizando a aplicação.

Devemos sempre acessar a página do Alura Typer através do endereço localhost:3000/principal.html. */

/*com também AJAX conseguimos enviar dados para servidor tanto via POST como com GET também*/

function buscaFrase() {

    $("#spinner").toggle();
    var fraseId = $("#frase-id").val(); /*para pegar o valor e enviar pro servidor*/

    //criacao do objeto JS que guarda a id
    var dados = {id : fraseId}; /*A fim de enviar os dados para o servidor de qual frase o AJAX vai lá buscar*/

    //passando objecto como segundo parametro
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
    },2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFrase(data) {

    console.log(data);

    var frase = $(".frase");
    frase.text(data.texto); //cuidado, texto com "o" no final 
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}

