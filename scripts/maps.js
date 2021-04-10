import {shovel} from './items/shovel.js';

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
    }

    loadlevel(level) {
        this.items=[];
        switch (level) {
            case 0:
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
                this.items.push(new shovel(5,4));
                this.blocks=4;
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
         }
    }

    drawMap(ctx) {
        for (var x=0;x<400/40;x++) //draw blocks
            for (var y=0;y<400/40;y++) {
                switch (this.map[x][y]) {
                    case 0:
                        ctx.fillStyle="rgb(55,55,55)";
                        break;
                    case 1:
                        ctx.fillStyle="rgb(100,0,0)";
                        break;
                    case 2: case 3:
                        ctx.fillStyle="rgb(200,0,0)";
                        break;
                    case 4:
                        ctx.fillStyle="rgb(300,0,0)";
                        break;
                    case 5:
                        ctx.fillStyle="rgb(0,0,200)";
                        break;
                }
                ctx.fillRect(y*40,x*40,40,40);
            }
            ctx.fillStyle="rgb(20,160,30)";
            ctx.fillRect(this.finish.x*40+10,this.finish.y*40+10,20,20); //draw portal (finish) object
            this.items.forEach( function (item) { //draw every item on the map
                item.draw();
            });
        }
}