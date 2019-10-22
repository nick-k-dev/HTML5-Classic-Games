UNIT = Object.freeze({
    RADIUS: 5,
    COLOUR: 'white',
    PIXELS_MOVE_RATE: 2,
    MAX_RAND_DIST_FROM_TARGET: 50
});

class Unit {

    constructor() {
        this.x = 0;
        this.y = 0;
        this.isDead = false;
        this.gotoX = 0;
        this.gotoY = 0;    
    }//end constructor

    reset() {
        this.x = Math.random() * canvas.width / 4;
        this.y = Math.random() * canvas.height / 4;
        this.gotoX = this.x;
        this.gotoY = this.y;
        this.isDead = false;
    }//end reset

    move() {
       let deltaX = this.gotoX - this.x;
       let deltaY = this.gotoY - this.y;
       let distanceToGo = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
       let moveX = UNIT.PIXELS_MOVE_RATE * deltaX/distanceToGo;
       let moveY = UNIT.PIXELS_MOVE_RATE * deltaY/distanceToGo;

       if(distanceToGo > UNIT.PIXELS_MOVE_RATE) {
            this.x += moveX;
            this.y += moveY;
        }
       else {
            this.x = this.gotoX;
            this.y = this.gotoY;
        }
    }//end move

    moveNear(mouseX, mouseY) {
        this.gotoX = mouseX + Math.random() * UNIT.MAX_RAND_DIST_FROM_TARGET;
        this.gotoY = mouseY + Math.random() * UNIT.MAX_RAND_DIST_FROM_TARGET;
    }

    draw() {
        if(!this.isDead) {
            drawCircle(this.x, this.y, UNIT.RADIUS, UNIT.COLOUR);
        }
    }//end draw
}