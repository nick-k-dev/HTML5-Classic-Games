//CAR LOGIC***********************
const  SHOT = Object.freeze({
    SPEED: 6.0,
    LIFE: 30,
    DISPLAY_RADIUS: 2.0,
    COLOR: 'white'
});

class Shot {
    constructor(){
        this.x = 75;
        this.y = 75;
        this.driftX = 0;
        this.driftY = 0;
    }

    handleScreenWrap() {
        if(this.x < 0) {this.x += canvas.width;}
        else if(this.x > canvas.width) {this.x -= canvas.width;}
        
        if(this.y < 0) {this.y += canvas.height;}
        else if(this.y > canvas.height) {this.y -= canvas.height;}
    }

    readyToFire() {
        return (this.life <= 0);
    }

    shootFrom(ship) {
        if(this.life === 0){
            this.x = ship.x;
            this.y = ship.y;

            this.xv = Math.cos(ship.angle) * SHOT.SPEED + ship.xv;
            this.yv = Math.sin(ship.angle) * SHOT.SPEED + ship.xy;

            this.life = SHOT.LIFE;
        }
    }

    move() {
        if(this.life > 0){
            this.x += this.xv;
            this.y += this.yv;
            this.handleScreenWrap();
            --this.life;
        }
    }

    reset() {
        this.life = 0;
    }

    draw() {
        if(this.life > 0) {
            drawCircle(this.x, this.y, SHOT.DISPLAY_RADIUS, SHOT.COLOR);
        }
    }
}