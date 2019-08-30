//TRACK LOGIC AND ARRAY FUNCTIONS****************
const TILE = Object.freeze({
    WIDTH: 50,
    HEIGHT: 50,
    COLUMNS: 16,
    ROWS: 12,
    GROUND: 0,
    WALL: 1,
    PLAYER: 2,
    GOAL: 3,
    KEY: 4,
    DOOR: 5
});

//20 by 15 array grid to visually represent the map
let	roomGrid =
[	
    1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,
    1,	4,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	1,
    1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	5,	0,	0,	0,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	1,
    1,	1,	5,	1,	1,	1,	1,	5,	1,	1,	1,	1,	1,	0,	0,	1,
    1,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	1,	1,	1,	5,	1,
    1,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	1,	1,	1,	0,	1,
    1,	0,	4,	0,	1,	4,	0,	0,	0,	4,	1,	0,	0,	1,	0,	1,
    1,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	3,	0,	1,	0,	1,
    1,	0,	2,	0,	5,	0,	5,	4,	4,	4,	1,	0,	0,	5,	0,	1,
    1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1
];

const tileHasTransparency = (tileType) => {
    return (tileType === TILE.GOAL ||
            tileType === TILE.KEY ||
            tileType === TILE.DOOR);
}

const drawRoom = () => {
    let tileIndex = 0;
    let tileLeftEdgeX = 0;
    let tileTopEdgeY = 0;
    for(let row = 0; row < TILE.ROWS; ++row){
        tileLeftEdgeX = 0;
        for(let column = 0; column < TILE.COLUMNS; ++column){
            let tileType = roomGrid[tileIndex];
            if(tileHasTransparency(tileType)){//if image is transparent draw ground underneath it first
                canvasContext.drawImage(tilePics[TILE.GROUND], tileLeftEdgeX, tileTopEdgeY);
            }
            canvasContext.drawImage(tilePics[tileType], tileLeftEdgeX, tileTopEdgeY);
            ++tileIndex;
            tileLeftEdgeX += TILE.WIDTH;
        }//end for
        tileTopEdgeY += TILE.HEIGHT;
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
    return (column + TILE.COLUMNS * row);
};

//will return true if 1(track visible) false if 0(no track)
const getTileTypeNumber = (tileColumn, tileRow) => {
    const index = convertColumnRowToIndex(tileColumn, tileRow);
    //check if the track in the array index is visible(which is represented by 1)
    return roomGrid[index];
};

const getTileAtPixelCoordinate = (pixelX, pixelY) => {
    const column = Math.floor(pixelX / TILE.WIDTH);
    const row = Math.floor(pixelY / TILE.HEIGHT);

    //return out of function, we aren't within the track array bounds so act as a wall
    if(column < 0 || column >= TILE.COLUMNS || row < 0 || row >= TILE.ROWS) {
        return TILE.WALL;
    }

    const index = convertColumnRowToIndex(column, row);
    return roomGrid[index];
};
//END TRACK LOGIC AND ARRAY FUNCTIONS****************