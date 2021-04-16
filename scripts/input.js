export class InputHandler { //simple class which controls player's input
    constructor(player) {

      document.addEventListener("keydown", event => {
        switch (event.keyCode) {
            case 32: //space for activating items
              if (player.item) player.activateItem();
              console.log(player.item.name);
                break;

            case 37: case 65: //left arrow or a
                if (player.item&&player.item.active) player.item.doThing(player, 'l');
                else player.moveLeft();
                break;

            case 38: case 87: //up arrow or w
                if (player.item&&player.item.active) player.item.doThing(player, 'u');
                else player.moveUp();
                break;

            case 39: case 68: //right arrow or d
                if (player.item&&player.item.active) player.item.doThing(player, 'r');
                else player.moveRight();
                break;

            case 40: case 83: //down arrow or s
                if (player.item&&player.item.active) player.item.doThing(player, 'd');
                else player.moveDown();
                break;

              case 82: //r - reset
              player.level.loadlevel(player.currentLevel);
              player.item=null;
              player.x = 160;
              player.y = 40;
              player.itemView();
              player.steps=0;
              player.calcScore();
              break;
        }
      });
    }
  }