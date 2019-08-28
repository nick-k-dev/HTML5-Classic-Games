let carPic1 = document.createElement('img');
let carPic2 = document.createElement('img');
let menuPic = document.createElement('img');

const imageList = Object.freeze([
    {varName: carPic1, fileName: 'player1.png'},
    {varName: carPic2, fileName: 'player2.png'},
    {varName: menuPic, fileName: 'mr-bean.png'},

    {trackType: TRACK.ROAD, fileName: 'track_road.png'},
    {trackType: TRACK.WALL, fileName: 'track_wall.png'},
    {trackType: TRACK.GOAL, fileName: 'track_goal.png'},
    {trackType: TRACK.TREE, fileName: 'track_tree.png'},
    {trackType: TRACK.FLAG, fileName: 'track_flag.png'}
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