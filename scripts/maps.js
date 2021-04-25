import {shovel} from './items/shovel.js';
import {hook} from './items/hook.js';

export class maps {
    constructor() {
        this.map = [
            [3,3,3,3,3,3,3,3,3,3],
            [3,3,3,3,3,3,3,3,3,3],
            [3,3,3,3,3,3,3,3,3,3],
            [3,3,3,3,3,3,3,3,3,3],
            [3,3,3,3,3,3,3,3,3,3],
            [3,3,3,3,3,3,3,3,3,3],
            [3,3,3,3,3,3,3,3,3,3],
            [3,3,3,3,3,3,3,3,3,3],
            [3,3,3,3,3,3,3,3,3,3],
            [3,3,3,3,3,3,3,3,3,3]
        ]
          this.items = [];
          this.columns = [];
          this.blocks = 4;
          this.score = 0;
          this.finish = {
              x:3,
              y:3
          };
          this.tileset = new Image();
          this.tileset.src = "images/tileset2.png";
          this.rand = Math.floor(Math.random()*2);
    }

    loadlevel(level) { //controlls loading of next levels
        document.getElementById("currentLevel").innerHTML = level+1;
        this.items=[];
        switch (level) {
            case 0:
                this.map =[
                    [3,3,4,1,1,2,3,3,3,3],
                    [3,3,4,0,0,2,3,3,3,3],
                    [3,3,4,0,0,2,3,3,3,3],
                    [3,3,4,7,5,1,1,2,3,3],
                    [3,4,1,0,0,0,0,2,3,3],
                    [3,4,0,0,0,5,0,2,3,3],
                    [3,4,0,0,0,0,0,2,3,3],
                    [3,10,1,1,1,1,1,11,3,3],
                    [3,3,3,3,3,3,3,3,3,3],
                    [3,3,3,3,3,3,3,3,3,3]
                  ];
                this.blocks=2;
                this.finish.x = 5;
                this.finish.y = 4;
                this.score=115;
                break;
            case 1:
                this.map =[
                    [3,3,4,1,1,2,3,3,3,3],
                    [3,3,4,0,0,2,3,3,3,3],
                    [3,3,4,0,0,2,3,3,3,3],
                    [3,3,4,0,0,1,1,2,3,3],
                    [3,3,10,8,5,0,0,2,3,3],
                    [3,4,1,1,0,7,5,1,2,3],
                    [3,4,0,0,0,0,5,0,2,3],
                    [3,4,0,5,0,0,0,0,2,3],
                    [3,4,0,7,0,0,0,0,2,3],
                    [3,10,1,1,1,1,1,1,11,3]
                  ];
                this.blocks=4;
                this.finish.x = 7;
                this.finish.y = 8;
                this.score=181;
                break;
            case 2:
                this.map = [
                    [3,3,4,1,1,2,3,3,3,3],
                    [3,3,4,0,0,2,3,3,3,3],
                    [3,3,4,0,0,2,3,3,3,3],
                    [3,3,4,0,0,1,1,1,1,2],
                    [4,1,1,0,0,7,0,0,0,2],
                    [4,0,0,0,5,5,0,5,0,2],
                    [4,0,5,0,0,0,5,0,9,11],
                    [10,8,0,0,7,0,0,0,2,3],
                    [3,10,1,1,8,0,9,1,11,3],
                    [3,3,3,3,10,1,11,3,3,3]
                ]
                this.blocks=5;
                this.finish.x = 5;
                this.finish.y = 8;
                this.items.push(new shovel(7,4));
                this.score=178;
                break;
            case 3:
                this.map = [
                    [3,3,3,4,1,1,2,3,3,3],
                    [3,3,3,4,0,0,13,2,3,3],
                    [4,1,1,1,0,0,0,2,3,3],
                    [4,0,0,0,5,0,7,1,2,3],
                    [4,0,0,9,8,0,0,0,2,3],
                    [4,7,0,13,12,5,0,0,2,3],
                    [4,0,5,0,5,0,5,0,2,3],
                    [4,0,0,0,0,0,0,9,11,3],
                    [10,1,8,0,0,9,1,11,3,3],
                    [3,3,10,1,1,11,3,3,3,3]
                ]
                this.blocks=5;
                this.finish.x = 6;
                this.finish.y = 5;
                this.items.push(new hook(5,4), new hook(3,7));
                this.score=193;
                break;
            case 4:
                this.map = [
                    [3,4,1,1,1,1,2,3,3,3],
                    [3,4,0,7,0,0,13,2,3,3],
                    [4,1,0,5,5,0,0,2,3,3],
                    [4,0,0,7,0,0,0,2,3,3],
                    [4,0,5,0,0,5,9,11,3,3],
                    [10,8,0,0,7,0,2,3,3,3],
                    [3,10,8,0,5,0,2,3,3,3],
                    [3,3,4,0,0,0,2,3,3,3],
                    [3,3,10,1,1,1,11,3,3,3],
                    [3,3,3,3,3,3,3,3,3,3]
                ]
                this.items = [new shovel(4,3)];
                this.blocks = 5;
                this.finish = {x:3,y:4};
                this.score=160;
                break;
            case 5:
                this.map = [
                    [3,3,3,4,1,1,2,3,3,3],
                    [3,3,4,12,0,0,13,1,2,3],
                    [3,4,12,0,0,0,0,0,13,2],
                    [3,4,0,0,5,0,0,5,0,2],
                    [3,4,0,0,9,8,7,0,0,2],
                    [3,4,0,0,2,4,0,5,7,2],
                    [3,10,8,0,13,12,0,0,0,2],
                    [3,3,4,5,0,5,0,0,0,2],
                    [3,3,10,8,0,0,0,9,1,11],
                    [3,3,3,10,1,1,1,11,3,3]
                ]
                this.items = [new shovel(6,5), new hook(3,6), new hook(5,3), new hook(4,7)];
                this.blocks = 5;
                this.finish = {x:6,y:6};
                this.score=175;
                break;
            }
    }

    drawMap(ctx, player) {
        this.columns=[];
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
                        ctx.drawImage(this.tileset,16,124,10,19,y*40,x*40,22,40);
                        break;
                    case 4:
                        ctx.drawImage(this.tileset,0,124,16,19,y*40,x*40,40,40);
                        break;
                    case 5:
                        ctx.drawImage(this.tileset,0,64,16,16,y*40,x*40,40,40);
                        break;
                    case 6:
                        ctx.drawImage(this.tileset,33,440,16,16,y*40+2,x*40,40,40);
                        break;
                    case 7:
                        this.columns.push([x,y]);
                        break;
                    case 8: 
                        ctx.drawImage(this.tileset,45,124,20,20,y*40,x*40,42,40);
                        break;
                    case 9:
                        ctx.drawImage(this.tileset,32,124,20,20,y*40,x*40,42,40);
                        break;
                    case 10:
                        ctx.drawImage(this.tileset,24,429,20,20,y*40,x*40,40,40);
                        break;
                    case 11:
                        ctx.drawImage(this.tileset,38,409,20,20,y*40,x*40,40,40);
                        break;
                    case 12:
                        ctx.drawImage(this.tileset,44,156,20,20,y*40,x*40,40,40);
                        break;
                    case 13:
                        ctx.drawImage(this.tileset,32,156,20,20,y*40,x*40,40,40);
                        break;
                }
            }
            ctx.drawImage(this.tileset,80,176,16,16,this.finish.x*40+5,this.finish.y*40+5,28,28); //draw portal (finish) object
            this.items.forEach( function (item) { //draw every item on the map
                item.draw();
            });
        }

        drawColumns(ctx) {
            this.columns.forEach(column => {
                ctx.drawImage(this.tileset,80,84,15,35,column[1]*40,(column[0]*40)-20,35,60);
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
7 - column
8 - right up corner
9 - left up corner
10 - right up corner column
11 - left up corner column
12 - right down corner
13 - left down corner
*/