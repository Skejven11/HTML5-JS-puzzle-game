export function drawLevelMenu(currentLevel) {
    var menu = document.getElementsByClassName("level-menu-container")[0];
    menu.innerHTML = "";
    for (let i=0;i<currentLevel+1;i++) {
        if (i===currentLevel) menu.innerHTML += "<button class='level-button' style='border:2px solid green; height:20px;' data-level='"+i+"'></button>";
        else menu.innerHTML += "<button class='level-button' data-level='"+i+"'></button>";
    }
    for (let i=0;i<5-currentLevel;i++) {
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
                clearBorders(i);
            });
            }
        }
}

function clearBorders(i) {
    const levelButton= document.getElementsByClassName("level-button");
    for (var j=0; j<levelButton.length;j++) {
        if (j===i)  {
            levelButton[j].style.border = "2px solid green";
            levelButton[j].style.height = "20px";
        }
        else {
            levelButton[j].style.border = "none";
            levelButton[j].style.height = "15px";
        }
    }
}   