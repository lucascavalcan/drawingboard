/* INITIAL DATA */
//armazenar a cor que está selecionada (active)
let currentColor = "black";  //cor que está selecionada no momento
let canDraw = false;  //variável que define se o modo desenho está ligado

let mouseX = 0;
let mouseY = 0;

//selecionar a tag canvas e, em seguida, o seu contexto 2d (para poder desenhar)
let screen = document.querySelector("#tela");
let ctx = screen.getContext("2d");

/* EVENTS */
document.querySelectorAll(".colorArea .color").forEach(item => {
    item.addEventListener("click", colorClickEvent)
});

//adicionando um evento de mousedown (mouse pressionado), mousemove e mouseup dentro da screen
screen.addEventListener("mousedown", mouseDownEvent);
screen.addEventListener("mousemove", mouseMoveEvent);
screen.addEventListener("mouseup", mouseUpEvent);

//evento de limpeza
document.querySelector(".clear").addEventListener("click", clearScreen);


/* FUNCTIONS */
//função que troca a cor quando clica
function colorClickEvent(e) {
    //primeira coisa que deve fazer é verificar em que cor que se clicou
    let color = e.target.getAttribute("data-color");
    currentColor = color;

    document.querySelector(".color.active").classList.remove("active"); //removendo o active da cor que está com essa class
    e.target.classList.add("active"); //adicionado o active na cor que clicou
};


function mouseDownEvent(e) {
    //ativa o modo desenho
    canDraw = true;
    //a função page.x mostra a posição horizontal do mouse e page.y, a vertical (precisa dessas posições para poder desenhar)
    mouseX = e.pageX - screen.offsetLeft; //distancia do próprio elemento para o fim da página (pois precisamos só da posição da screen, mas o pageX pega página toda)
    mouseY = e.pageY - screen.offsetTop;
    //precisa da posição atual do mouse na hora de dar o clique (pois é nessa posição que o desenho começa a ser feito)
};

function mouseMoveEvent(e) {
    //verifica se o canDraw é true (pois só pode desenhar com o modo desenho ativado)
    if (canDraw) {
        //quando puder desenhar, vai executar uma função que desenha de fato
        draw(e.pageX, e.pageY); //passa a posição do mouse como parâmetro


    };
};

function mouseUpEvent() {
    //desativa o modo desenho
    canDraw = false;
};


//função que desenha de fato
function draw(x, y) {
    let pointX = x - screen.offsetLeft; //posição do mouse em relação a screen
    let pointY = y - screen.offsetTop;  //posição do mouse em relação a screen

    //desenhar
    ctx.beginPath(); //início do processo
    ctx.lineWidth = 5;  //largura da linha
    ctx.lineJoin = "round";  //formato da linha (round = bordas arredondadas)
    ctx.moveTo(mouseX, mouseY); //movendo o cursor para a posição inicial
    ctx.lineTo(pointX, pointY); //faça uma linha até o pointx e o pointy
    ctx.closePath(); //encerrando o processo
    ctx.strokeStyle = currentColor; //cor do desenho
    ctx.stroke(); //finaliza o processo


    //após fazer o desenho, tem que salvar a posição atual no mousex e mousey, pois, para fazer o próximo movimento, precisa dessa continuidade
    mouseX = pointX;
    mouseY = pointY;
};

function clearScreen() {
    //ela vai zerar o cursor e o processo de desenho:
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    //função que limpa de fatp
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};