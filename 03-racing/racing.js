//KEYBORAD CONSTANTS AND CHECKS**********
const KEY = Object.freeze({
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40
});

let keyHeld = {
    gas: false,
    reverse: false,
    left: false,
    right: false
};

//END KEYBOARD CONSTANTS AND CHECKS*****************


//TRACK LOGIC AND ARRAY FUNCTIONS****************
const TRACK = Object.freeze({
    WIDTH: 40,
    HEIGHT: 40,
    GAP: 1,
    COLUMNS: 20,
    ROWS: 15
});

//20 by 15 array grid to visually represent the map
let	tracksGrid =
[	
    1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,	1,	1,
    1,	0,	0,	0,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,
    1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	1,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	1,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	1,	1,
    1,	0,	0,	0,	1,	1,	1,	0,	0,	0,	0,	1,	1,	1,	0,	0,	0,	0,	0,	1,
    1,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	1,
    1,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,
    1,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,
    1,	0,	0,	0,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,	1,
    1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1
];

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

const bounceOffTrackAtPixelCoordinate = (pixelX, pixelY) => {
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

    }
};


//END TRACK LOGIC AND ARRAY FUNCTIONS****************


//CAR LOGIC***********************
let car = {
    x: 75,
    y: 75,
    speed: 0,
    angle: 0,
    picLoaded:false,
    move: function() {
        //move the car
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    },
    resetPos: function(){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.speed *= -1;
        this.speed *= -1;
    }
};

let carPic = document.createElement('img');


const resetGame = () => {
    car.resetPos();
};


const moveEverything = () => {
    bounceOffTrackAtPixelCoordinate(car.x, car.y);
    if(keyHeld.gas) {
        car.speed += 0.5;
    }
    if(keyHeld.reverse){
        car.speed -= 0.5;
    }
    if(keyHeld.left){
        car.angle += -0.03 * Math.PI;
    }
    if(keyHeld.right){
        car.angle += 0.03 * Math.PI;
    }
    car.move();
};

//END CAR LOGIC***********************



//********LISTENER CALLBACKS
const keyPressed = (evt) => {
    
    if(evt.keyCode === KEY.UP_ARROW) {
        keyHeld.gas = true;
    }
    if(evt.keyCode === KEY.DOWN_ARROW){
        keyHeld.reverse = true;
    }
    if(evt.keyCode === KEY.LEFT_ARROW){
        keyHeld.left = true;
    }
    if(evt.keyCode === KEY.RIGHT_ARROW){
        keyHeld.right = true;
    }

    evt.preventDefault();
}

const keyReleased = (evt) => {
    if(evt.keyCode === KEY.UP_ARROW) {
        keyHeld.gas = false;
    }
    if(evt.keyCode === KEY.DOWN_ARROW){
        keyHeld.reverse = false;
    }
    if(evt.keyCode === KEY.LEFT_ARROW){
        keyHeld.left = false;
    }
    if(evt.keyCode === KEY.RIGHT_ARROW){
        keyHeld.right = false;
    }
}
//*********END LISTENER CALLBAKCKS



//CANVAS, EVENTS AND ONLOAD SETUP********************
let canvas;
let canvasContext;
window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    carPic.onload = function() {
        car.picLoaded = true;//don't display image until loaded.
    }
    carPic.src = 'player1.png';
    car.resetPos();

    //listeners
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);


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

const drawBitmapCenteredAtLocationWithRotation = (graphic, x, y, angle) => {
    canvasContext.save();//allows us to undo translate movement and rotate spin
    canvasContext.translate(x, y); //sets the point where our graphic will go
    canvasContext.rotate(angle); // sets the rotation
    canvasContext.drawImage(graphic, -graphic.width/2, -graphic.height/2); //center, draw
    canvasContext.restore();
}

const drawCar = () => {
    if(car.picLoaded) {
        drawBitmapCenteredAtLocationWithRotation(carPic, car.x, car.y, car.angle);
    }
}

const drawEverything = () => {
    //Clears the canvas with black
    drawRect(0, 0, canvas.width, canvas.height, 'black');

    //draw the tracks
    drawTracks();

    //playerCar
    drawCar();
};
//END DRAW CALLS*************************