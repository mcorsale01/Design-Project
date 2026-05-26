
//board
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

//dino
let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight
}

//cactus
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

//physics
let velocityX = -8; //cactus moving left speed
let velocityY = 0;
let gravity = .4;

let gameOver = false;
let score = 0;

let easterEggCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let easterEggIndex = 0;
let easterEggActive = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); //used for drawing on the board

    //draw initial dinosaur
    //context.fillStyle="green";
    //context.fillRect(dino.x, dino.y, dino.width, dino.height);

    dinoImg = new Image();
    dinoImg.src = "dino.png";
    dinoImg.onload = function () {
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
    }

    cactus1Img = new Image();
    cactus1Img.src = "cactus1.png";

    cactus2Img = new Image();
    cactus2Img.src = "cactus2.png";

    cactus3Img = new Image();
    cactus3Img.src = "cactus3.png";

    requestAnimationFrame(update);
    setInterval(placeCactus, 1000); //1000 milliseconds = 1 second
    document.addEventListener("keydown", moveDino);
    document.addEventListener("keydown", detectEasterEgg);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    //dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, dinoY); //apply gravity to current dino.Y

    if (easterEggActive && dinoImg.src.indexOf("images-removebg-preview.png") === -1) {
        dinoImg.src = "images-removebg-preview.png";
    }

    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

    //cactus
    for (let i = 0; i < cactusArray.length; i++) {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

        if (detectCollision(dino, cactus)) {
            gameOver = true;
            dinoImg.src = "dino-dead.png";
            dinoImg.onload = function () {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            }
            alert("Game Over");
            location.reload();
        }
    }

    //score
    context.fillStyle = "black";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5, 20);
}

function moveDino(e) {
    if (gameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
        velocityY = -10;
    }
}


function placeCactus() {
    if (gameOver) {
        return;
    }

    //place cactus
    let cactus = {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight
    };

    let placeCactusChance = Math.random();

    if (placeCactusChance > .90) { //10% chance
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .70) { //30% chance
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .50) { //50% chance
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }



    if (cactusArray.length > 5) {
        cactusArray.shift(); //remove first element from array so array doesnt constantly grow
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function detectEasterEgg(e) {
    if (e.code === easterEggCode[easterEggIndex]) {
        easterEggIndex++;
        if (easterEggIndex === easterEggCode.length) {
            activateEasterEgg();
            easterEggIndex = 0;
        }
    } else {
        easterEggIndex = 0;
        if (e.code === easterEggCode[easterEggIndex]) {
            easterEggIndex++;
        }
    }
}

function activateEasterEgg() {
    easterEggActive = true;
}