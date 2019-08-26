//TRACK LOGIC AND ARRAY FUNCTIONS****************
const TRACK = Object.freeze({
    WIDTH: 40,
    HEIGHT: 40,
    GAP: 1,
    COLUMNS: 20,
    ROWS: 15
});

let tracksGrid = new Array(TRACK.COLUMNS * TRACK.ROWS);

const drawTracks = () => {
    for(let column = 0; column < TRACK.COLUMNS; ++column){
        for(let row = 0; row < TRACK.ROWS; ++row){
            //only draw if the track is visible(holds a 1 at the provided index)
            if(isTrackAtTileCoordinateVisible(column, row)){
                let trackLeftEdgeX = column * TRACK.WIDTH;
                let trackTopEdgeY = row * TRACK.HEIGHT;
                //draw a blue rectangle at that position, leaving a small margin for GAP
                drawRect(trackLeftEdgeX, trackTopEdgeY, TRACK.WIDTH - TRACK.GAP, TRACK.HEIGHT - TRACK.GAP, 'blue');
            }//end if
        }//end for
    }//end for
};//end drawTracks

const resetTracks = () => {
    for(let i = TRACK.COLUMNS * 0; i < TRACK.COLUMNS * TRACK.ROWS; ++i){
        tracksGrid[i] = 1;
    }
};

const convertColumnRowToIndex = (column, row) => {
    //example   if column = 4 and row = 1
    //          we move to index 3(for column) then take the length of TRACK.COLUMNS(10)
    //          and multiply by the number of rows(row = 1 TRACK.COLUMNS = 10 so total is 10) 
    //          so we add 10 to 3 and get 13. 13 would be our index because we have column 3 row 4
    //          but represented in a 1d array instead of 2d 
    //          0,   1,  2,  3,  4,  5,  6,  7,  8,  9
    //          10, 11, 12, 13, 14, 15, 16, 17, 18, 19
    //          20, 21, 22, 23, 24, 25, 26, 27, 28, 29
    return (column + TRACK.COLUMNS * row);
};

//will return true if 1(track visible) false if 0(no track)
const isTrackAtTileCoordinateVisible = (tileColumn, tileRow) => {
    const index =convertColumnRowToIndex(tileColumn, tileRow);
    //check if the track in the array index is visible(which is represented by 1)
    return (tracksGrid[index] === 1);
};

const removeTrackAndHandleBounceAtPixelCoordinate = (pixelX, pixelY) => {
    const column = Math.floor(pixelX / TRACK.WIDTH);
    const row = Math.floor(pixelY / TRACK.HEIGHT);

    //return out of function, we aren't within the track array bounds
    if(column < 0 || column >= TRACK.COLUMNS || row < 0 || row >= TRACK.ROWS) {
        return;
    }

    const index = convertColumnRowToIndex(column, row);

    //We hit a visible track so handle it
    if(tracksGrid[index] === 1) {
        //check the position of the car a frame earlier
        const previousCarX = car.x-car.speedX;
        const previousCarY = car.y-car.speedY;
        const previousColumn = Math.floor(previousCarX / TRACK.WIDTH);
        const previousRow = Math.floor(previousCarY / TRACK.HEIGHT);

        let bothTestsFailed = true;

        //we came in from the side because we aren't in the same column.
        if(previousColumn != column){
            const adjacentTrackIndex = convertColumnRowToIndex(previousColumn, previousRow);
            //make sure the side we want to reflect off of isn't blocked by another track
            if(tracksGrid[adjacentTrackIndex] != 1){
                car.speedX *= -1;
                bothTestsFailed = false;
            }
        }

        //we came in vertically because we aren't in the same row.
        if(previousRow != row) {
            const adjacentTrackindex = convertColumnRowToIndex(previousColumn, previousRow);
            //make sure the side we want to refelct off isn't blocked by another track
            if(tracksGrid[adjacentTrackindex] != 1){
                car.speedY *= -1;
                bothTestsFailed = false;
            }
        }

        //handle both tests failing We came from an inside corner where we had adjacent tracks flip both to avoid
        //going into that next location
        if(bothTestsFailed){
            car.speedX *= -1;
            car.speedY *= -1;
        }

        //Remove track that was hit
        tracksGrid[index] = 0;
    }
};


//END TRACK LOGIC AND ARRAY FUNCTIONS****************


//CAR LOGIC***********************
let car = {
    x: 75,
    y: 75,
    speedX: 10,
    speedY: 6,
    radius: 10,
    move: function() {

        if(this.y > canvas.height){
            this.resetPos();
        }

        if(this.y < 0 + this.radius){
            this.speedY *= -1;
        }

        if(this.x < 0 + this.radius || this.x > canvas.width - this.radius){
            this.speedX *= -1;
        }

        //move the car
        this.x += this.speedX;
        this.y += this.speedY;
    },
    resetPos: function(){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.speedX *= -1;
        this.speedY *= -1;
    }
};

const resetGame = () => {
    car.resetPos();
};


const moveEverything = () => {
    removeTrackAndHandleBounceAtPixelCoordinate(car.x, car.y);
    car.move();
};

//END CAR LOGIC***********************



//CANVAS, EVENTS AND ONLOAD SETUP********************
let canvas;
let canvasContext;
window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    //handle tracksGrid calls
    resetTracks();
    car.resetPos();

    const framesPerSecond = 30;
    setInterval(()=>{
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);
};
//END CANVAS AND ONLOAD SETUP********************


//DRAW CALLS*************************
const drawRect = (topLeftX, topLeftY, boxWidth, boxHeight, fillColor) => {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
};

const drawCircle = (centerX, centerY, radius, fillColor) => {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    //Takes x, y, radius, start angle, end angle, anticlockwise
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    canvasContext.fill();
};

const drawEverything = () => {
    //Clears the canvas with black
    drawRect(0, 0, canvas.width, canvas.height, 'black');

    //draw the tracks
    drawTracks();

    //playerCar
    drawCircle(car.x, car.y, car.radius, 'white');
};
//END DRAW CALLS*************************