import {item} from './items.js';

export class shovel extends item { //shovel item
    constructor(x, y) {
        super(x, y)
        this.itemSprite.src = "images/items/shovel.png";
        this.name = "hammer";
    }

    doThing(player, direction) { //"destroys" selected column
        let x = player.x/40;
        let y = player.y/40;
        switch (direction) {
            case "r":
                if (player.level.map[y][x+1]!=7) { document.getElementById('error').play(); }
                else {
                    player.level.map[y][x+1]=0;
                    player.item=null;
                }
                break;
            case "u":
                if (player.level.map[y-1][x]!=7) { document.getElementById('error').play(); }
                else {
                    player.level.map[y-1][x]=0;     
                    player.item=null;           
                }
                break;
            case "l":
                if (player.level.map[y][x-1]!=7) { document.getElementById('error').play(); }
                else {
                    player.level.map[y][x-1]=0;     
                    player.item=null;           
                }
                break;
            case "d":
                if (player.level.map[y+1][x]!=7) { document.getElementById('error').play(); }
                else {
                    player.level.map[y+1][x]=0;     
                    player.item=null;           
                }
                break;
        }
    }
}