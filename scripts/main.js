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
const player = new Player(level);
level.drawMap(ctx);
const startButton = document.getElementById("start-button");

startButton.addEventListener("click", function(){
    startGame();
});

function gameLoop() {
    ctx.clearRect(0,0,400,400);
    level.drawMap(ctx);
    player.draw();
    requestAnimationFrame(gameLoop);
}

function startGame() {
    document.getElementsByClassName("canvas-menu")[0].style.visibility = "hidden";
    var music = document.getElementById("background-music");
    music.volume = 0.4;
    music.play();
    new InputHandler(player);
    gameLoop();
}