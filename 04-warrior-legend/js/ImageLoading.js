let playerPic = document.createElement('img');

const imageList = Object.freeze([
    {varName: playerPic, fileName: 'warrior.png'},

    {tileType: TILE.GROUND, fileName: 'world_ground.png'},
    {tileType: TILE.WALL, fileName: 'world_wall.png'},
    {tileType: TILE.GOAL, fileName: 'world_goal.png'},
    {tileType: TILE.KEY, fileName: 'world_key.png'},
    {tileType: TILE.DOOR, fileName: 'world_door.png'}
]);

let tilePics = [];

let filesLeftToLoad = imageList.length;

const beginLoadingImage = (imgObject, fileName) => {
    imgObject.onload = countLoadedImageAndLaunchIfReady;
    imgObject.src = 'img/' + fileName;
};

const loadImageForTile = (tileType, fileName) => {
    tilePics[tileType] = document.createElement('img');
    beginLoadingImage(tilePics[tileType], fileName);
};

const loadImages = () => {
    imageList.forEach(function(image){
        if(image.tileType != undefined){
            loadImageForTile(image.tileType, image.fileName);
        }
        else {
            beginLoadingImage(image.varName, image.fileName);
        }
    });
};

const countLoadedImageAndLaunchIfReady = () => {
    --filesLeftToLoad;

    if(filesLeftToLoad === 0){
        loadingFinishedStartGame();
    }
};