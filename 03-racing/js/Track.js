//TRACK LOGIC AND ARRAY FUNCTIONS****************
const TRACK = Object.freeze({
    WIDTH: 40,
    HEIGHT: 40,
    COLUMNS: 20,
    ROWS: 15,
    ROAD: 0,
    WALL: 1,
    PLAYER: 2,
    GOAL: 3,
    TREE: 4,
    FLAG: 5
});

//20 by 15 array grid to visually represent the map
let	tracksGrid =
[	
    1,	1,	5,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	4,	4,	4,
    1,	0,	3,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	4,	4,	4,
    1,	0,	3,	0,	0,	0,	0,	0,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,	4,	4,
    1,	0,	3,	0,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,
    1,	0,	3,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,
    1,	1,	5,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	5,	0,	0,	0,	0,	0,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	1,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	1,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	1,	1,
    1,	0,	0,	0,	5,	1,	1,	0,	0,	0,	0,	1,	1,	1,	0,	0,	0,	0,	0,	1,
    1,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	5,	0,	0,	0,	0,	0,	0,	1,
    1,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,
    1,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	4,	4,
    1,	0,	2,	0,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	1,	4,	4,	4,
    1,	1,	1,	1,	1,	4,	4,	4,	1,	1,	1,	1,	1,	1,	1,	1,	1,	4,	4,	4
];

const drawTracks = () => {
    let trackIndex = 0;
    let gridLeftEdgeX = 0;
    let gridTopEdgeY = 0;
    for(let row = 0; row < TRACK.ROWS; ++row){
        gridLeftEdgeX = 0;
        for(let column = 0; column < TRACK.COLUMNS; ++column){
            let type = tracksGrid[trackIndex];
            canvasContext.drawImage(trackPics[type], gridLeftEdgeX, gridTopEdgeY);
            ++trackIndex;
            gridLeftEdgeX += TRACK.WIDTH;
        }//end for
        gridTopEdgeY += TRACK.HEIGHT;
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
const getTileTypeNumber = (tileColumn, tileRow) => {
    const index = convertColumnRowToIndex(tileColumn, tileRow);
    //check if the track in the array index is visible(which is represented by 1)
    return tracksGrid[index];
};

const checkForTrackAtPixelCoordinate = (pixelX, pixelY) => {
    const column = Math.floor(pixelX / TRACK.WIDTH);
    const row = Math.floor(pixelY / TRACK.HEIGHT);

    //return out of function, we aren't within the track array bounds
    if(column < 0 || column >= TRACK.COLUMNS || row < 0 || row >= TRACK.ROWS) {
        return;
    }

    const index = convertColumnRowToIndex(column, row);

    //We are on the road so return
    return (tracksGrid[index] === TRACK.ROAD);
};
//END TRACK LOGIC AND ARRAY FUNCTIONS****************