const  SHOT = Object.freeze({
    SPEED: 6.0,
    LIFE: 30,
    DISPLAY_RADIUS: 2.0,
    COLOR: 'white'
});

class Shot extends Actor {
    constructor(){
        super();
    }

    readyToFire() {
        return (this.life <= 0);
    }

    shootFrom(ship) {
        if(this.life === 0){
            this.x = ship.x;
            this.y = ship.y;

            this.xv = Math.cos(ship.angle) * SHOT.SPEED + ship.xv;
            this.yv = Math.sin(ship.angle) * SHOT.SPEED + ship.yv;

            this.life = SHOT.LIFE;
        }
    }

    hasHit(enemy) {
        if(this.life <= 0){
            return false;
        }
        return enemy.hasCollided(this.x, this.y);
    }

    move() {
        if(this.life > 0){
            super.move();
            --this.life;
        }
    }

    reset() {
        super.reset();
        this.life = 0;
    }

    draw() {
        if(this.life > 0) {
            drawCircle(this.x, this.y, SHOT.DISPLAY_RADIUS, SHOT.COLOR);
        }
    }
}