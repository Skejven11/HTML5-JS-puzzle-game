import { Player } from './player.js';
import { InputHandler } from './input.js';
import { maps } from './maps.js';

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;
let currentLevel = 0;

const level = new maps();
level.loadlevel(currentLevel);

const player = new Player(level);
new InputHandler(player);

level.drawMap(ctx);

function gameLoop() {
    ctx.clearRect(0,0,400,400);
    level.drawMap(ctx);
    player.draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

