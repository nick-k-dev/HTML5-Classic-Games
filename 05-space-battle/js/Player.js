//CAR LOGIC***********************
const  PLAYER = Object.freeze({
    SPACESPEED_DECAY_MULT: 0.99,
    THRUST_POWER: 0.15,
    TURN_RATE: 0.03 * Math.PI
});

class Player {
    constructor(){
        this.x = 75;
        this.y = 75;
        this.xv = 0;
        this.xy = 0;
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

    handleScreenWrap() {
        if(this.x < 0) {this.x += canvas.width;}
        else if(this.x > canvas.width) {this.x -= canvas.width;}
        
        if(this.y < 0) {this.y += canvas.height;}
        else if(this.y > canvas.height) {this.y -= canvas.height;}
    }

    move() {
        if(this.keyHeld.left){
            this.angle += -PLAYER.TURN_RATE;
        }
        if(this.keyHeld.right){
            this.angle += PLAYER.TURN_RATE;
        }

        if(this.keyHeld.gas) {
            this.xv += Math.cos(this.angle) * PLAYER.THRUST_POWER;
            this.xy += Math.sin(this.angle) * PLAYER.THRUST_POWER;
        }

        //move the player
        this.x += this.xv;
        this.y += this.xy;

        this.handleScreenWrap();

        this.xv *= PLAYER.SPACESPEED_DECAY_MULT;
        this.xy *= PLAYER.SPACESPEED_DECAY_MULT;

        this.shot.move();
    }

    cannonFire() {
        if(this.shot.readyToFire()){
            this.shot.shootFrom(this);
        }
    }

    reset() {
        this.xv = 0;
        this.xy = 0;
        this.angle = -0.5 * Math.PI;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
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