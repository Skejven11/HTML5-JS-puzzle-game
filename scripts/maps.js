import {shovel} from './items/shovel.js';
import {hook} from './items/hook.js';

export class maps {
    constructor() {
        this.map =[
            [1,1,1,1,1,1,1,1,1,1],
            [2,1,1,0,0,0,0,0,0,3],
            [2,1,0,0,5,0,0,0,0,3],
            [2,1,0,0,0,0,0,0,0,3],
            [2,1,1,0,5,0,0,0,0,3],
            [2,1,1,0,0,0,0,0,0,3],
            [2,1,0,0,0,0,5,0,0,3],
            [2,0,0,5,0,0,0,0,0,3],
            [2,0,0,5,0,0,0,0,0,3],
            [4,4,4,4,4,4,4,4,4,4]
          ];
          this.items = [];
          this.blocks = 4;
          this.finish = {
              x:3,
              y:3
          };
          this.tileset = new Image();
          this.tileset.src = "images/tileset2.png";
          this.rand = Math.floor(Math.random()*2);
    }

    loadlevel(level) { //controlls loading of next levels
        this.items=[];
        switch (level) {
            case 0:
                this.map =[
                    [3,3,4,1,1,2,3,3,3,3],
                    [3,3,4,0,0,2,3,3,3,3],
                    [3,3,4,0,0,2,3,3,3,3],
                    [3,3,4,0,0,1,1,2,3,3],
                    [3,3,6,8,5,0,0,2,3,3],
                    [3,4,1,1,0,7,5,1,2,3],
                    [3,4,0,0,0,0,5,0,2,3],
                    [3,4,0,5,0,0,0,0,2,3],
                    [3,4,0,7,0,0,0,0,2,3],
                    [3,6,1,1,1,1,1,1,3,3]
                  ];
                this.items.push(new shovel(3,2), new hook(4,3));
                this.blocks=4;
                this.finish.x = 7;
                this.finish.y = 8;
                break;
            case 1:
                this.map = [
                    [1,1,1,1,1,1,1,1,1,1],
                    [2,0,0,0,0,0,0,0,0,3],
                    [2,0,0,0,5,0,0,0,0,3],
                    [2,0,0,0,0,0,0,0,0,3],
                    [2,0,0,0,5,0,5,0,0,3],
                    [2,0,0,0,0,0,0,0,0,3],
                    [2,0,0,0,0,0,5,0,0,3],
                    [2,0,5,0,0,5,0,0,0,3],
                    [2,0,0,0,0,0,0,0,0,3],
                    [4,4,4,4,4,4,4,4,4,4]
                ]
                this.blocks=6;
                this.finish.x = 4;
                this.finish.y = 4;
                this.items.push(new shovel(6,7));
                break;
            case 2:
                    console.log("level3");
         }
    }

    drawMap(ctx) {
        for (var x=0;x<400/40;x++) //draw blocks
            for (var y=0;y<400/40;y++) {
                switch (this.map[x][y]) {
                    case 0:
                        ctx.drawImage(this.tileset,16,64,16,16,y*40,x*40,40,40);
                        break;
                    case 1:
                        ctx.drawImage(this.tileset,29,12,20,20,y*40,x*40,40,40);
                        break;
                    case 2: 
                        ctx.drawImage(this.tileset,17,124,9,19,y*40,x*40,22,40);
                        break;
                    case 4:
                        ctx.drawImage(this.tileset,0,124,15,19,y*40,x*40,40,40);
                        break;
                    case 5:
                        ctx.drawImage(this.tileset,0,64,16,16,y*40,x*40,40,40);
                        break;
                    case 6:
                        ctx.drawImage(this.tileset,33,440,16,16,y*40+2,x*40,40,40);
                        break;
                    case 7:
                        ctx.drawImage(this.tileset,80,84,16,35,y*40,(x*40)-20,40,60);
                        break;
                    case 8: 
                        ctx.drawImage(this.tileset,44,124,20,20,y*40,x*40,42,40);
                        break;
                }
            }
            ctx.drawImage(this.tileset,80,176,16,16,this.finish.x*40+5,this.finish.y*40+5,28,28); //draw portal (finish) object
            this.items.forEach( function (item) { //draw every item on the map
                item.draw();
            });
        }
}


/*
0 - walking tile
1 - upper and bottom end tile
2 - right end tile
3 - nothing
4 - left end tile
5 - crate
6 - destroyable wall tile
7 - column
8 - right up corner
*/