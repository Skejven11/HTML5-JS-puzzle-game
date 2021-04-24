import { Player } from './player.js';
import { InputHandler } from './input.js';
import { maps } from './maps.js';
import { buttonListener, drawLevelMenu } from "./level-menu.js";

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;
let music = document.getElementById("background-music");
music.volume = 0.25;

const level = new maps();
let currentLevel = 0;
const startButton = document.getElementById("start-button");
if (localStorage.getItem("currentLevel")) { 
    currentLevel = parseInt(localStorage.getItem("currentLevel"));
    startButton.innerHTML = "Continue your quest!"
}
level.loadlevel(currentLevel);
drawLevelMenu(currentLevel);
var gameState = {state:0}; //0 - starting menu 1 - next level menu 2 - playing 3 - ending screen
const player = new Player(level, gameState);
player.currentLevel = currentLevel;
level.drawMap(ctx);
new InputHandler(player, gameState);
new buttonListener(player);

startButton.addEventListener("click", function(){
    if (gameState.state===0) startGame();
    else if (gameState.state===1) {
        gameState.state=2;
        document.getElementsByClassName("canvas-menu")[0].classList.add("canvas-menu-animated");
        gameLoop();
    }
    else if (gameState.state===3) {
        player.currentLevel=0;
        gameState.state=2;
        document.getElementsByClassName("canvas-menu")[0].classList.add("canvas-menu-animated");
        player.resetPlayer();
        gameLoop();
    }
});

let volume = document.getElementById("volume");
volume.addEventListener("change", function(e){
    music.volume = e.currentTarget.value/100;
});

function gameLoop() {
    ctx.clearRect(0,0,400,400);
    level.drawMap(ctx);
    player.draw();
    level.drawColumns(ctx);
    if (gameState.state===1) nextLevelMenu();
    else if (gameState.state===3) endingScreen();
    else requestAnimationFrame(gameLoop);
}

function startGame() {
    document.getElementsByClassName("canvas-menu")[0].classList.add("canvas-menu-animated");
    music.play();
    gameState.state=2;
    gameLoop();
}

function endingScreen() {
    document.getElementsByClassName("canvas-menu")[0].classList.remove("canvas-menu-animated");
    document.getElementById("score").innerHTML = "Congratulations! <br> You've beaten Box Quest! <br> Your score is: <b>"+500+"</b>!";
    document.getElementById("start-button").innerHTML = "Start from the beginning"; 
    document.getElementById("steps-score").innerHTML = "Steps done in this level: <b>"+player.steps+"</b>"; 
}

function nextLevelMenu() {
    document.getElementsByClassName("canvas-menu")[0].classList.remove("canvas-menu-animated");
    document.getElementById("score").innerHTML = "Your score is <b>"+500+"</b>! <br> Congratulations!";
    document.getElementById("start-button").innerHTML = "Next level";
}