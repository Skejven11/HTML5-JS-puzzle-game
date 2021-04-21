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
new InputHandler(player);

level.drawMap(ctx);

function gameLoop() {
    ctx.clearRect(0,0,400,400);
    level.drawMap(ctx);
    player.draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

