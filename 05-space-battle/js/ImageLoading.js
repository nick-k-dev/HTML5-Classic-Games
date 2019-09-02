let playerPic = document.createElement('img');
let playerThrustPic = document.createElement('img');
let enemyPic1 = document.createElement('img');
let enemyPic2 = document.createElement('img');
let enemyPic3 = document.createElement('img');
let enemyPic4 = document.createElement('img');

const imageList = Object.freeze([
    {varName: playerPic, fileName: 'player1.png'},
    {varName: playerThrustPic, fileName: 'player1-thrust.png'},
    {varName:enemyPic1, fileName: 'ufo1.png'},
    {varName:enemyPic2, fileName: 'ufo2.png'},
    {varName:enemyPic3, fileName: 'ufo3.png'},
    {varName:enemyPic4, fileName: 'ufo4.png'}
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