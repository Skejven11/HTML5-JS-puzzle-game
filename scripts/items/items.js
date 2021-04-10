export class item { //item class, specific items will inherit stuff from this one
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.itemSprite = new Image();
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.active = false;
    }

    draw() {
        this.ctx.drawImage(this.itemSprite, this.x*40, this.y*40);
    }

}