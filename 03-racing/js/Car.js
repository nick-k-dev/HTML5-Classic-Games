//CAR LOGIC***********************
const  CAR = Object.freeze({
    GROUNDSPEED_DECAY_MULT: 0.94,
    DRIVE_POWER: 0.5,
    REVERSE_POWER: 0.2,
    TURN_RATE: 0.03 * Math.PI,
    MIN_TURN_SPEED: 0.5
});

class Car {
    constructor(){
        this.x = 75;
        this.y = 75;
        this.speed = 0;
        this.angle = -0.5 * Math.PI;
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

    move() {
        if(this.keyHeld.gas) {
            this.speed += CAR.DRIVE_POWER;
        }
        if(this.keyHeld.reverse){
            this.speed -= CAR.REVERSE_POWER;
        }
        if(Math.abs(this.speed) >= CAR.MIN_TURN_SPEED){
            if(this.keyHeld.left){
                this.angle += -CAR.TURN_RATE;
            }
            if(this.keyHeld.right){
                this.angle += CAR.TURN_RATE;
            }
        }
        //move the car
        const nextX = this.x + Math.cos(this.angle) * this.speed;
        const nextY = this.y + Math.sin(this.angle) * this.speed;

        if(checkForTrackAtPixelCoordinate(nextX, nextY)){
            this.x = nextX;
            this.y = nextY;
        }
        else{
            this.speed *= -0.5;
        }

        this.speed *= CAR.GROUNDSPEED_DECAY_MULT;
    }

    resetPos() {
        let row = -1;
        let column = -1;
        for(let i = 0; i < tracksGrid.length; ++i){
            if(tracksGrid[i] === TRACK.PLAYER){
                row = Math.floor(i/TRACK.COLUMNS);
                column = i % TRACK.COLUMNS;
                //We want the code to think this spot is a road again not the player
                //So we reset back to 0 instead of the 2 to find the player
                tracksGrid[i] = TRACK.ROAD;
                break;
            }
        }
        if(row > 0 && column > 0){
            this.x = column * TRACK.WIDTH + 0.5 * TRACK.WIDTH;
            this.y = row * TRACK.HEIGHT + 0.5 * TRACK.HEIGHT;
        }
    }

    init(graphic) {
        this.bitMap = graphic;
        this.resetPos();
    }
}