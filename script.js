/* INITIAL DATA */
let currentColor = "black";
let canDraw = false;  

let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector("#tela");
let ctx = screen.getContext("2d");

/* EVENTS */
document.querySelectorAll(".colorArea .color").forEach(item => {
    item.addEventListener("click", colorClickEvent)
});

screen.addEventListener("mousedown", mouseDownEvent);
screen.addEventListener("mousemove", mouseMoveEvent);
screen.addEventListener("mouseup", mouseUpEvent);

document.querySelector(".clear").addEventListener("click", clearScreen);


/* FUNCTIONS */
function colorClickEvent(e) {
    let color = e.target.getAttribute("data-color");
    currentColor = color;

    document.querySelector(".color.active").classList.remove("active"); 
    e.target.classList.add("active"); 
};


function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft; 
    mouseY = e.pageY - screen.offsetTop;
};

function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY); 


    };
};

function mouseUpEvent() {
    canDraw = false;
};


function draw(x, y) {
    let pointX = x - screen.offsetLeft; 
    let pointY = y - screen.offsetTop;  


    ctx.beginPath(); //início do processo
    ctx.lineWidth = 5;  //largura da linha
    ctx.lineJoin = "round";  //formato da linha (round = bordas arredondadas)
    ctx.moveTo(mouseX, mouseY); //movendo o cursor para a posição inicial
    ctx.lineTo(pointX, pointY); //faça uma linha até o pointx e o pointy
    ctx.closePath(); //encerrando o processo
    ctx.strokeStyle = currentColor; //cor do desenho
    ctx.stroke(); //finaliza o processo


    mouseX = pointX;
    mouseY = pointY;
};

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};