import {item} from './items.js';

export class hook extends item { //hook item
    constructor(x, y) {
        super(x, y)
        this.itemSprite.src = "images/items/hook.png";
        this.itemIconActive = "images/items/hookIconActive.png";
        this.name = "hook";
        this.description = "Pulls selected box in the opposite direction";
    }

    doThing(player, direction) { //pulls selected box in the opposite direction 
        let x = player.x/player.speed;
        let y = player.y/player.speed;
        switch (direction) {
            case "r":
                if (player.level.map[y][x+1]!=5) { document.getElementById('error').play(); }
                else {
                    if(player.level.map[y][x-1]!=0) document.getElementById('error').play();
                    else {
                        player.level.map[y][x+1]=0;
                        player.level.map[y][x]=5;
                        player.x-=player.speed; 
                        player.item="";
                        player.itemView(player.item);
                    }
                }
                break;
            case "u":
                if (player.level.map[y-1][x]!=5) { document.getElementById('error').play(); }
                else {
                    if(player.level.map[y+1][x]!=0) document.getElementById('error').play();
                    else {
                        player.level.map[y-1][x]=0;
                        player.level.map[y][x]=5;
                        player.y+=player.speed;      
                        player.item="";
                        player.itemView(player.item);         
                    }
                }
                break;
            case "l":
                if (player.level.map[y][x-1]!=5) { document.getElementById('error').play(); }
                else {
                    if(player.level.map[y][x+1]!=0)  document.getElementById('error').play();
                    else {
                        player.level.map[y][x-1]=0;
                        player.level.map[y][x]=5;
                        player.x+=player.speed;      
                        player.item="";
                        player.itemView(player.item);            
                    }
                }
                break;
            case "d":
                if (player.level.map[y+1][x]!=5) { document.getElementById('error').play(); }
                else {
                    if(player.level.map[y-1][x]!=0) document.getElementById('error').play();
                    else {
                        player.level.map[y+1][x]=0;
                        player.level.map[y][x]=5;
                        player.y-=player.speed;     
                        player.item="";
                        player.itemView(player.item);           
                    }
                }
                break;
        }
    }
}