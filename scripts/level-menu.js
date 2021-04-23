export function drawLevelMenu(currentLevel) {
    var menu = document.getElementsByClassName("level-menu-container")[0];
    menu.innerHTML = "";
    for (let i=0;i<currentLevel+1;i++) {
    menu.innerHTML += "<button class='level-button' data-level='"+i+"'></button>";
    }
    for (let i=0;i<3-currentLevel;i++) {
        menu.innerHTML += "<div class='fake-level-button'></div>";
    }
}

export class buttonListener {
    constructor(player) {
        const levelButton= document.getElementsByClassName("level-button");
        for (let i=0; i<levelButton.length;i++) {
            levelButton[i].addEventListener("click", function() {
                if (player.gameState.state!=2) return;
                currentLevel = parseInt(levelButton[i].dataset.level);
                player.currentLevel = currentLevel;
                player.resetPlayer();
            });
        }
    }   
}