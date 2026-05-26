// game stuff
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var foodX = blockSize * 10;
var foodY = blockSize * 10;

var gameOver = false;

// easter egg
let easterEggCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let easterEggIndex = 0;
let easterEggActive = false;
let mrkatzImg;

// speed
let gameSpeed = 100;
let gameInterval;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    mrkatzImg = new Image();
    mrkatzImg.src = "mrkatz.png";

    placeFood();

    document.addEventListener("keyup", changeDirection);
    document.addEventListener("keydown", detectEasterEgg);

    document.getElementById("slowerBtn").addEventListener("click", slowDown);
    document.getElementById("fasterBtn").addEventListener("click", speedUp);

    gameInterval = setInterval(update, gameSpeed);
}

function update() {

    if (gameOver) {
        return;
    }

    if (easterEggActive) {
        context.drawImage(mrkatzImg, 0, 0, board.width, board.height);
    } else {
        context.fillStyle = "black";
        context.fillRect(0, 0, board.width, board.height);
    }

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length > 0) {
        snakeBody[0] = [snakeX, snakeY];
    }

    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    if (
        snakeX < 0 ||
        snakeX >= cols * blockSize ||
        snakeY < 0 ||
        snakeY >= rows * blockSize
    ) {
        gameOver = true;
        alert("Game Over");
        location.reload();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
            location.reload();
        }
    }

    context.fillStyle = "lime";

    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
}

function changeDirection(e) {

    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }

    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }

    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }

    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
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

function slowDown() {
    gameSpeed += 50;
    clearInterval(gameInterval);
    gameInterval = setInterval(update, gameSpeed);
}

function speedUp() {
    if (gameSpeed > 25) {
        gameSpeed -= 50;
        clearInterval(gameInterval);
        gameInterval = setInterval(update, gameSpeed);
    }
}