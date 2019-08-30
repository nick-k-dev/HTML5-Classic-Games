//Warrior LOGIC***********************
const  WARRIOR = Object.freeze({
    MOVE_SPEED: 3.0
});

class Warrior {
    constructor(){
        this.x = 75;
        this.y = 75;
        this.keyHeld = {
            north: false,
            east: false,
            south: false,
            west: false
        };
    }

    setupControls(northKey, eastKey, southKey, westKey) {
        this.keyNorth = northKey;
        this.keyEast = eastKey;
        this.keySouth = southKey;
        this.keyWest = westKey;
    }

    move() {
        //move the player
        let nextX = this.x;
        let nextY = this.y;

        if(this.keyHeld.north) {
            nextY -= WARRIOR.MOVE_SPEED;
        }
        if(this.keyHeld.east){
            nextX += WARRIOR.MOVE_SPEED;
        }
        if(this.keyHeld.south){
            nextY += WARRIOR.MOVE_SPEED;
        }
        if(this.keyHeld.west){
            nextX -= WARRIOR.MOVE_SPEED;
        }

        const currentCollisionType = getTileAtPixelCoordinate(nextX, nextY);

        if(currentCollisionType === TILE.GROUND){
            this.x = nextX;
            this.y = nextY;
        }
        else if(currentCollisionType === TILE.GOAL){
            document.getElementById('debugText').innerHTML = this.name + " won the race!";
            this.reset();
        }
    }

    reset() {
        if(this.homeX === undefined){
            for(let i = 0; i < roomGrid.length; ++i){
                if(roomGrid[i] === TILE.PLAYER){
                    let row = Math.floor(i/TILE.COLUMNS);
                    let column = i % TILE.COLUMNS;
                    this.homeX = column * TILE.WIDTH + 0.5 * TILE.WIDTH;
                    this.homeY = row * TILE.HEIGHT + 0.5 * TILE.HEIGHT;
                    //We want the code to think this spot is a road again not the player
                    //So we reset back to 0 instead of the 2 to find the player
                    roomGrid[i] = TILE.GROUND;
                    break;
                }
            }//end for
        }//end if
        this.x = this.homeX;
        this.y = this.homeY;
    }

    init(graphic, playerName) {
        this.bitMap = graphic;
        this.name = playerName;
        this.reset();
    }

    draw = () => {
        drawBitmapCenteredAtLocationWithRotation(this.bitMap, this.x, this.y, 0.0);
    }
}