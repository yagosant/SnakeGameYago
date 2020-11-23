//pega o id criado no html
let canvas = document.getElementById("snake");
//desenha a tela do came
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direcao = "right";
let food = {
    //gera numeros aleatorios de acordo com o canvas
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
//desenha a tela
function criarBG(){
   context.fillStyle='black';
    
    //posicao x,t, altura e largura 
    context.fillRect(0,0, 16 * box, 16 * box);
    
}

//criando a cobra
function criarCobrinha(){
    //for varrendo o array
    for(i=0;i<snake.length; i++){
        context.fillStyle = "white";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//desenhando a comida
function comida(){
    context.fillStyle = "yellow";
    context.fillRect(food.x, food.y, box, box);
}

//criando um evento de clique e vai chamar o update
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direcao != "right"){
        direcao = "left";
        }

    if(event.keyCode == 38 && direcao != "down"){
            direcao = "up";
            } 
            
    if(event.keyCode == 39 && direcao != "left"){
                direcao = "right";
                }
    if(event.keyCode == 40 && direcao != "up"){
                    direcao = "down";
                    }
}


//função que atualiza o game varias vezes
function iniciarJogo(){
    

    //simular um plano cartesiano
    if(snake[0].x > 15* box && direcao == "right"){
        snake[0].x = 0;
    }

    if(snake[0].x < 0 && direcao == "left"){
        snake[0].x = 16* box;
    }
    if(snake[0].y > 15 * box && direcao == "down"){
        snake[0].y = 0;
    }
    
    if(snake[0].y < 0 && direcao == "up"){
        snake[0].y = 16 * box;
    }

    //verifica se a cobra se chocou
   for(i=1; i <snake.length; i++){
       if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
        //para o jogo   
        clearInterval(jogo);
        alert("Você perdeu, game over :(");
       }

   }


    criarBG();
    criarCobrinha();
    comida();

    //criar as posiçoes da cobra
    let snakeX= snake[0].x;
    let snakeY= snake[0].y;

    //criando as coordenadas
    if(direcao == "right"){
        snakeX += box;
    }
    if(direcao == "left"){
        snakeX -= box;
    }
    if(direcao == "up"){
        snakeY -= box;
    }
    if(direcao == "down"){
        snakeY += box;
    }


    //verifica a posição da comida e da cobra
    if(snakeX != food.x || snakeY != food.y){
        //funcão pop para retirar o ultimo elemento do array
        snake.pop();
    } else{

        //gera numeros aleatorios de acordo com o canvas
    food.x =  Math.floor(Math.random() * 15 + 1) * box;
    food.y =  Math.floor(Math.random() * 15 + 1) * box;

    }

    let newHead = {
        x:snakeX,
        y: snakeY
    }
    //adiciona mais 1
    snake.unshift(newHead);
  
}

//atualiza a cada 100 milisegundos
let jogo = setInterval(iniciarJogo,100);

