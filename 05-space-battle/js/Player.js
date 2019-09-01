//CAR LOGIC***********************
const  PLAYER = Object.freeze({
    GROUNDSPEED_DECAY_MULT: 0.94,
    DRIVE_POWER: 0.5,
    REVERSE_POWER: 0.2,
    TURN_RATE: 0.03 * Math.PI,
    MIN_TURN_SPEED: 0.5
});

class Player {
    constructor(){
        this.x = 75;
        this.y = 75;
        this.keyHeld = {
            gas: false,
            reverse: false,
            left: false,
            right: false
        };
    }

    setupControls(forwardKey, backKey, leftKey, rightKey) {
        this.keyForGas = forwardKey;
        this.keyForReverse = backKey;
        this.keyForLeft = leftKey;
        this.keyForRight = rightKey;
    }

    handleScreenWrap() {
        if(this.x < 0) {this.x += canvas.width;}
        if(this.x > canvas.width) {this.x -= canvas.width;}
        if(this.y < 0) {this.y += canvas.height;}
        if(this.y > canvas.height) {this.y -= canvas.height;}
    }

    move() {
        if(this.keyHeld.gas) {
            this.speed += PLAYER.DRIVE_POWER;
        }
        if(this.keyHeld.reverse){
            this.speed -= PLAYER.REVERSE_POWER;
        }
        if(Math.abs(this.speed) >= PLAYER.MIN_TURN_SPEED){
            if(this.keyHeld.left){
                this.angle += -PLAYER.TURN_RATE;
            }
            if(this.keyHeld.right){
                this.angle += PLAYER.TURN_RATE;
            }
        }
        //move the player
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        this.speed *= PLAYER.GROUNDSPEED_DECAY_MULT;

        this.handleScreenWrap();
    }

    reset() {
        this.speed = 0;
        this.angle = -0.5 * Math.PI;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
    }

    init(graphic) {
        this.bitMap = graphic;
        this.reset();
    }
}