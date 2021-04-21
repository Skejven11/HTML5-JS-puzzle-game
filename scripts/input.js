export class InputHandler { //simple class which controls player's input
    constructor(player) {
      let keySeq = "";

      document.addEventListener("keydown", event => {
        keySeq+=event.key;
        if (keySeq.length===3) {
          if (keySeq!=="jp2") keySeq="";
          else { 
          document.body.style.backgroundImage="url(https://steamuserimages-a.akamaihd.net/ugc/257085621754935023/E21109A4FA7C0213DE12713471F453D08A15D6B7/)";
          keySeq="";
          document.getElementById("easter-egg").play();
          }
        }

        switch (event.key) {
            case "space": 
              if (player.item) player.activateItem();
              console.log(player.item.name);
                break;

            case "ArrowLeft": case "a": 
                if (player.item&&player.item.active) player.item.doThing(player, 'l');
                else player.moveLeft();
                break;

            case "ArrowUp": case "w": 
                if (player.item&&player.item.active) player.item.doThing(player, 'u');
                else player.moveUp();
                break;

            case "ArrowRight": case "d": 
                if (player.item&&player.item.active) player.item.doThing(player, 'r');
                else player.moveRight();
                break;

            case "ArrowDown": case "s": 
                if (player.item&&player.item.active) player.item.doThing(player, 'd');
                else player.moveDown();
                break;

              case "r": 
                player.resetPlayer();
                break;
        }
      });
    }
  }