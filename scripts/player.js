export class Player {
    constructor(map) {
        this.x = 160;
        this.y = 40;
        this.speed = 40;
        this.level = map;
        this.currentLevel = 0;
        this.playerSprite = new Image();
        this.playerSprite.src = "images/player.png";
        this.item = null;
    }

    draw(ctx) {
        ctx.drawImage(this.playerSprite, this.x, this.y);
    }

    moveLeft(){
        if (this.calcColision("l")) return; 
        else this.x -= this.speed; //if there is nothing in the way move the player
    }

    moveRight(){
        if (this.calcColision("r")) return;
        else this.x += this.speed; //if there is nothing in the way move the player
    }

    moveUp(){
        if (this.calcColision("u")) return;
        else this.y -= this.speed; //if there is nothing in the way move the player
    }

    moveDown(){
        if (this.calcColision("d")) return;
        else this.y += this.speed; //if there is nothing in the way move the player
    }

    calcColision(dir){ //calculates if something is in a way and does stuff, probably should split it into more functions but cba tbh
        if (dir==="r") {
            var x = (this.x+this.speed)/this.speed;
            var y = this.y/this.speed;
        }
        else if (dir==="u") {
            var x = this.x/this.speed;
            var y = (this.y-this.speed)/this.speed;
        }
        else if (dir==="l") {
            var x = (this.x-this.speed)/this.speed;
            var y = this.y/this.speed;
        }
        else {
            var x = this.x/this.speed;
            var y = (this.y+this.speed)/this.speed;
        }

        this.level.items.forEach(function (item) { //checks if there is an item in the way, if so pick it up
                if (x===item.x&&y===item.y) { 
                    this.item=item; 
                    this.level.items.splice(item);
                    return false; 
                }
        }.bind(this));

        if (this.level.map[y][x]==5) { //checks if movable block is in the way, then calculates if its possible to move it
            switch (dir) {
                case "r":
                    if (this.level.map[y][x+1]>0) { document.getElementById('error').play(); return true; }
                    else {
                        if (y==this.level.finish.y&&x+1==this.level.finish.x) {  //checks if moved block went into the portal
                            this.level.map[y][x]=0;
                            this.level.blocks--; //1 less block, if blocks===0 then win the map
                        }
                        else {
                            this.level.map[y][x]=0;
                            this.level.map[y][x+1]=5;
                        }
                    break;
                    }
                case "u":
                    if (this.level.map[y-1][x]>0) { document.getElementById('error').play(); return true; }
                    else {
                        if (y-1==this.level.finish.y&&x==this.level.finish.x) {
                            this.level.map[y][x]=0;
                            this.level.blocks--;
                        }
                        else {
                            this.level.map[y][x]=0;
                            this.level.map[y-1][x]=5;
                        }
                        break;
                    }
                case "l":
                    if (this.level.map[y][x-1]>0) { document.getElementById('error').play(); return true; }
                    else {
                        if (y==this.level.finish.y&&x-1==this.level.finish.x) {
                            this.level.map[y][x]=0;
                            this.level.blocks--;
                        }
                        else {
                            this.level.map[y][x]=0;
                            this.level.map[y][x-1]=5;
                        }
                        break;
                    }
                case "d":
                    if (this.level.map[y+1][x]>0) { document.getElementById('error').play(); return true; }
                    else {
                        if (y+1==this.level.finish.y&&x==this.level.finish.x) { 
                            this.level.map[y][x]=0;
                            this.level.blocks--;
                        }
                        else {
                            this.level.map[y][x]=0;
                            this.level.map[y+1][x]=5;
                        }
                        break;
                    }
            }
            if (this.level.blocks==0) { this.currentLevel++; this.level.loadlevel(this.currentLevel); } //if blocks == 0 then win map
            return false;
        } 
        else if (this.level.map[y][x]!=0&&this.level.map[y][x]!=5) {
            document.getElementById('error').play();
            return true;
        }
        else return false;
    }

    activateItem() {
        if (!this.item.active) this.item.active = true;
        else this.item.active = false;
    }
}