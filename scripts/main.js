import { Player } from './player.js';
import { InputHandler } from './input.js';
import { maps } from './maps.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.globalCompositeOperation='destination-over';
canvas.width = 400;
canvas.height = 400;
const level = new maps();
level.loadlevel(0);
var gameState = {state:0}; //0 - starting menu 1 - next level menu 2 - playing
const player = new Player(level, gameState);
level.drawMap(ctx);
const startButton = document.getElementById("start-button");
new InputHandler(player, gameState);

startButton.addEventListener("click", function(){
    if (gameState.state===0) startGame();
    else if (gameState.state===1) {
        gameState.state=2;
        document.getElementsByClassName("canvas-menu")[0].classList.add("canvas-menu-animated");
        gameLoop();
    }
});

function gameLoop() {
    ctx.clearRect(0,0,400,400);
    level.drawMap(ctx);
    player.draw();
    if (gameState.state===1) nextLevelMenu();
    else requestAnimationFrame(gameLoop);
}

function startGame() {
    document.getElementsByClassName("canvas-menu")[0].classList.add("canvas-menu-animated");
    var music = document.getElementById("background-music");
    music.volume = 0.4;
    music.play();
    gameState.state=2;
    gameLoop();
}

function nextLevelMenu() {
    document.getElementsByClassName("canvas-menu")[0].classList.remove("canvas-menu-animated");
}