let playerPic = document.createElement('img');
let enemyPic = document.createElement('img');

const imageList = Object.freeze([
    {varName: playerPic, fileName: 'player1.png'},
    {varName:enemyPic, fileName: 'ufo.png'}
]);

let trackPics = [];

let filesLeftToLoad = imageList.length;

const beginLoadingImage = (imgObject, fileName) => {
    imgObject.onload = countLoadedImageAndLaunchIfReady;
    imgObject.src = 'img/' + fileName;
};

const loadImageForTrack = (trackType, fileName) => {
    trackPics[trackType] = document.createElement('img');
    beginLoadingImage(trackPics[trackType], fileName);
};

const loadImages = () => {
    imageList.forEach(function(image){
        if(image.trackType != undefined){
            loadImageForTrack(image.trackType, image.fileName);
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