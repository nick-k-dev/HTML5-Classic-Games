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

        const currentCollisionType = getTrackAtPixelCoordinate(nextX, nextY);

        if(currentCollisionType === TRACK.ROAD){
            this.x = nextX;
            this.y = nextY;
        }
        else if(currentCollisionType === TRACK.GOAL){
            document.getElementById('debugText').innerHTML = this.name + " won the race!";
            players.player1.resetPos();
            players.player2.resetPos();
        }
        else{
            this.speed *= -0.5;
        }

        this.speed *= CAR.GROUNDSPEED_DECAY_MULT;
    }

    resetPos() {
        this.speed = 0;
        this.angle = -0.5 * Math.PI;
        if(this.homeX === undefined){
            for(let i = 0; i < tracksGrid.length; ++i){
                if(tracksGrid[i] === TRACK.PLAYER){
                    let row = Math.floor(i/TRACK.COLUMNS);
                    let column = i % TRACK.COLUMNS;
                    this.homeX = column * TRACK.WIDTH + 0.5 * TRACK.WIDTH;
                    this.homeY = row * TRACK.HEIGHT + 0.5 * TRACK.HEIGHT;
                    //We want the code to think this spot is a road again not the player
                    //So we reset back to 0 instead of the 2 to find the player
                    tracksGrid[i] = TRACK.ROAD;
                    break;
                }
            }//end for
        }//end if
        this.x = this.homeX;
        this.y = this.homeY;
    }

    init(graphic, carName) {
        this.bitMap = graphic;
        this.name = carName;
        this.resetPos();
    }
}