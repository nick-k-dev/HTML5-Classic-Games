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

        const nextTileIndex = getTileIndexAtPixelCoordinate(nextX, nextY);
        let nextTileType = TILE.WALL;
        if(nextTileIndex != undefined){
            nextTileType = roomGrid[nextTileIndex];
        }

        switch(nextTileType) {
            case TILE.GROUND:
                this.x = nextX;
                this.y = nextY;
                break;
            case TILE.GOAL:
                document.getElementById("debugText").innerHTML = this.name + " won";
                this.reset();
                break;
            case TILE.DOOR:
                if(this.keysHeld > 0) {
                    --this.keysHeld;
                    document.getElementById('debugText').innerHTML = 'Keys: ' + this.keysHeld;
                    roomGrid[nextTileIndex] = TILE.GROUND;
                }
                break;
            case TILE.KEY:
                ++this.keysHeld;
                document.getElementById('debugText').innerHTML = 'KEYS: ' + this.keysHeld;
                roomGrid[nextTileIndex] = TILE.GROUND;
                break;
            case TILE.WALL: //For now do nothing for a wall or by default
            default:
                break;

        }//end switch
    }//end move

    reset() {
        this.keysHeld = 0;
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