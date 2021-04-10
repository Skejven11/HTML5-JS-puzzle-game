export class InputHandler { //simple class which controls player's input
    constructor(player) {
      document.addEventListener("keydown", event => {
        switch (event.keyCode) {
            case 32: //space
              if (player.item) player.activateItem();
              break;
            case 37: //left arrow
              if (player.item&&player.item.active) player.item.doThing(player, 'l');
              else player.moveLeft();
                break;
            case 38: //up arrow
              if (player.item&&player.item.active) player.item.doThing(player, 'u');
              else  player.moveUp();
                break;
            case 39: //right arrow
              if (player.item&&player.item.active) player.item.doThing(player, 'r');
              else  player.moveRight();
                break;
            case 40: //down arrow
              if (player.item&&player.item.active) player.item.doThing(player, 'd');
              else  player.moveDown();
                break;
        }
      });
    }
  }