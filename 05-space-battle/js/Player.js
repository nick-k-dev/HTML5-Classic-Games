const  PLAYER = Object.freeze({
    SPACESPEED_DECAY_MULT: 0.99,
    THRUST_POWER: 0.15,
    TURN_RATE: 0.03 * Math.PI
});

class Player extends Actor {
    constructor(){
        super();
        this.angle = 0;
        this.keyHeld = {
            gas: false,
            left: false,
            right: false
        };
    }

    setupControls(forwardKey, leftKey, rightKey, shotKey) {
        this.keyForGas = forwardKey;
        this.keyForLeft = leftKey;
        this.keyForRight = rightKey;
        this.keyForShotFiring = shotKey;
    }

    move() {
        if(this.keyHeld.left){
            this.angle += -PLAYER.TURN_RATE;
        }
        if(this.keyHeld.right){
            this.angle += PLAYER.TURN_RATE;
        }

        if(this.keyHeld.gas) {
            this.bitMap = playerThrustPic;
            this.xv += Math.cos(this.angle) * PLAYER.THRUST_POWER;
            this.yv += Math.sin(this.angle) * PLAYER.THRUST_POWER;
        }
        else{
            this.bitMap = playerPic;
        }

        super.move();

        this.xv *= PLAYER.SPACESPEED_DECAY_MULT;
        this.yv *= PLAYER.SPACESPEED_DECAY_MULT;

        this.shot.move();
    }

    cannonFire() {
        if(this.shot.readyToFire()){
            this.shot.shootFrom(this);
        }
    }

    checkCollision(enemy) {
        if(enemy.hasCollided(this.x, this.y)){
            this.reset();
            document.getElementById('debugText').innerHTML = 'Player Crashed!';
        }
        if(this.shot.hasHit(enemy)) {
            enemy.reset();
            this.shot.reset();
            document.getElementById('debugText').innerHTML = 'Enemy Blasted!';
        }
    }

    reset() {
        super.reset();
        this.angle = -0.5 * Math.PI;
    }

    init(graphic) {
        this.bitMap = graphic;
        this.reset();
        this.shot = new Shot();
        this.shot.reset();
    }

    draw() {
        this.shot.draw();
        drawBitmapCenteredAtLocationWithRotation(this.bitMap, this.x, this.y, this.angle);
    }
}