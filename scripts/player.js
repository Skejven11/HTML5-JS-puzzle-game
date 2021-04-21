export class Player {
    constructor(map) {
        this.x = 160;
        this.y = 40;
        this.speed = 40;

        this.level = map;
        this.currentLevel = 0;
        this.steps = 0;

        this.playerSprite = new Image();
        this.playerSprite.src = "images/player/player.png";
        this.currentAnimFrame = 0;
        this.frameCount = 0;

        this.smokeSprite = new Image();
        this.smokeSprite.src = "images/player/smokepuff.png";
        this.currentSmokeFrame = 0;
        this.smokeFrameCount = 0;

        this.item = "";

        let canvas =  document.getElementById('myCanvas');
        this.ctx = canvas.getContext('2d');

        this.itemView(this.item);
        this.calcScore();
    }

    draw() {
        this.frameCount++;
        if (this.frameCount===8) {
            this.frameCount=0;
            this.currentAnimFrame++;
        }
        this.ctx.drawImage(this.playerSprite, this.currentAnimFrame*16, 0, 15, 19, this.x+7, this.y, 26, 34);
        if (this.currentAnimFrame===3) this.currentAnimFrame=0;
    }

    moveLeft(){
        if (this.calcColision("l")) return; 
        else this.x -= this.speed; //if there is nothing in the way move the player
        this.drawSmoke();
        this.calcScore();
    }

    moveRight(){
        if (this.calcColision("r")) return;
        else this.x += this.speed; //if there is nothing in the way move the player
        this.drawSmoke();
        this.calcScore();
    }

    moveUp(){
        if (this.calcColision("u")) return;
        else this.y -= this.speed; //if there is nothing in the way move the player
        this.drawSmoke();
        this.calcScore();
    }

    moveDown(){
        if (this.calcColision("d")) return;
        else this.y += this.speed; //if there is nothing in the way move the player
        this.drawSmoke();
        this.calcScore();
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
        if (this.level.finish.x===x&&this.level.finish.y===y) { document.getElementById('error').play(); return true; }

        this.level.items.forEach(function (item, index) { //checks if there is an item in the way, if so pick it up
                if (x===item.x&&y===item.y) { 
                    if(this.item) this.level.items.push(this.item)
                    this.item=item; 
                    this.level.items.splice(index, 1);
                    this.itemView(item);
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
            if (this.level.blocks==0) { this.currentLevel++; this.resetPlayer(); return true;} //if blocks == 0 then win map
            return false;
        } 
        else if (this.level.map[y][x]!=0&&this.level.map[y][x]!=5) {
            document.getElementById('error').play();
            return true;
        }
        else return false;
    }

    activateItem() {
        if (!this.item.active) { this.item.active = true; document.querySelector(".item-icon").src = this.item.itemIconActive;}
        else { this.item.active = false; document.querySelector(".item-icon").src = this.item.itemSprite.src; }
    }

    drawSmoke() {
        this.smokeFrameCount++;
        if (this.smokeFrameCount===3) {
            this.smokeFrameCount=0;
            this.currentSmokeFrame++;
        }
        this.ctx.drawImage(this.smokeSprite, this.currentSmokeFrame*40, 0, 40, 40, this.x+5, this.y+20, 25, 20);
        if (this.currentSmokeFrame===5) { this.currentSmokeFrame=0; return; }
        requestAnimationFrame(()=>this.drawSmoke());
    }

    itemView(item) {
        if (!item) {
            document.querySelector(".item-icon").src = "images/items/defaultIcon.png";
            document.getElementById("itemName").innerHTML = "none";
            document.getElementById("itemDescription").innerHTML = "";
            return;
        }
        document.querySelector(".item-icon").src = item.itemSprite.src;
        document.getElementById("itemDescription").innerHTML = item.description;
        document.getElementById("itemName").innerHTML = item.name;
    }

    calcScore(){
        document.getElementById("steps").innerHTML = this.steps;
        this.steps++;
    }

    resetPlayer() {
        this.x=160; 
        this.y=40; 
        this.level.loadlevel(this.currentLevel); 
        this.item=""; 
        this.itemView(this.item); 
        this.steps=0;
        this.calcScore();
    }
}
