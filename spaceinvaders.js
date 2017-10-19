var canvas = document.getElementById("canvasjogo");

canvas.width = 480;
canvas.height = 320;

var contexto = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

//raio da bola 
var raioBola = 10;

// Base (controlada pelo jogador)//
var baseAltura = 10;
var baseLargura = 75;
var baseX = (canvas.width-baseLargura)/2;

// estado dos controladores do jogo
var teclaEsquerdaPressionada = false;
var teclaDireitaPressionada = false;


function desenharbola(){
    contexto.beginPath();
    contexto.arc(x, y, 10, 0, Math.PI*2);
    contexto.fillStyle = "#0095DD";
    contexto.fill();
    contexto.closePath();
}

setInterval(desenharbola);

function desenharbase(){
    contexto.beginPath();
    contexto.rect(baseX, canvas.height-baseAltura, baseLargura, baseAltura);
    contexto.fillStyle = "#0095DD";
    contexto.fill();
    contexto.closePath();
}

function desenha(){
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    desenharbola();
    desenharbase();
    x += dx;
    y += dy;

if (x + dx > canvas.width - raioBola || x + dx < raioBola){
    dx = -dx;
}
    
//colisão com borda superior

if(y + dy < raioBola){
    dy = -dy;
}
//colisão com a borsa inferior
else if(y + dy > canvas.height - raioBola){
    //caso esteja na direção da base, altera o movimento da bola
    if( x > baseX && x < baseX + baseLargura){
        dy = -dy;
    }
    //Senão termina o jogo
    else{
        //imprime mensagem de gameover
        contexto.font = "40px Arial";
        contexto.fillText("Fim do jogo!", 150,50);
        //atualiza a pagina
        setTimeout(function(){
            location.reload(true);
        },30000);
    }
 }
 
 //move a base controlada pelo jogador
 if(teclaDireitaPressionada && baseX < canvas.width - baseLargura){
     baseX += 7;
    }else if(teclaEsquerdaPressionada && baseX > 0){
        baseX -= 7;
    }

} 

//leitores de eventos do teclado
document.addEventListener("keydown", trataTeclaBaixo, false);
document.addEventListener("keyup", trataTeclaCima, false);

//Funções que tratam os eventos keydown e keyup
function trataTeclaBaixo(evento){
    //se o keycode == Seta para a direita
    if(evento.keyCode == 39){
        teclaDireitaPressionada = true;
    }
    //Se o keycode == seta para a esquerda 
    else if(evento.keyCode == 37){
        teclaEsquerdaPressionada = true;
    }
}
//Funções que tratam os eventos keydown e keyup
function trataTeclaCima(evento){
    //se o keycode == Seta para a direita
    if(evento.keyCode == 39){
        teclaDireitaPressionada = false;
    }
    //Se o keycode == seta para a esquerda 
    else if(evento.keyCode == 37){
        teclaEsquerdaPressionada = false;
    }
}
    
    
    setInterval(desenha, 10);





