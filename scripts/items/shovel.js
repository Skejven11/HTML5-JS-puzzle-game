import {item} from './items.js';

export class shovel extends item { //shovel item
    constructor(x, y) {
        super(x, y)
        this.itemSprite.src = "images/items/shovel.png";
        this.itemIconActive = "images/items/shovelIconActive.png";
        this.name = "Hammer";
        this.description = "Destroys selected column"
    }

    doThing(player, direction) { //"destroys" selected column
        let x = player.x/40;
        let y = player.y/40;
        switch (direction) {
            case "r":
                if (player.level.map[y][x+1]!=7) { document.getElementById('error').play(); }
                else {  
                    player.level.map[y][x+1]=0;
                    player.item="";
                    player.itemView(player.item);
                    player.calcScore();
                }
                break;
            case "u":
                if (player.level.map[y-1][x]!=7) { document.getElementById('error').play(); }
                else {
                    player.level.map[y-1][x]=0;     
                    player.item="";
                    player.itemView(player.item);       
                    player.calcScore();    
                }
                break;
            case "l":
                if (player.level.map[y][x-1]!=7) { document.getElementById('error').play(); }
                else {
                    player.level.map[y][x-1]=0;     
                    player.item="";
                    player.itemView(player.item);    
                    player.calcScore();       
                }
                break;
            case "d":
                if (player.level.map[y+1][x]!=7) { document.getElementById('error').play(); }
                else {
                    player.level.map[y+1][x]=0;     
                    player.item="";
                    player.itemView(player.item);     
                    player.calcScore();      
                }
                break;
        }
    }
}