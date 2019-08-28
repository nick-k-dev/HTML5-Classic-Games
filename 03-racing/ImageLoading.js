let carPic = document.createElement('img');
let roadPic = document.createElement('img');
let wallPic = document.createElement('img');

const images = Object.freeze([
    [carPic, 'player1.png'],
    [roadPic, 'track_road.png'],
    [wallPic, 'track_wall.png']
]);

let filesLeftToLoad = images.length;

const beginLoadingImage = (imgObject, fileName) => {
    imgObject.onload = countLoadedImageAndLaunchIfReady;
    imgObject.src = 'img/' + fileName;
};

const loadImages = () => {
    images.forEach(function(element){
        beginLoadingImage(element[0], element[1]);
    });
};

const countLoadedImageAndLaunchIfReady = () => {
    --filesLeftToLoad;

    if(filesLeftToLoad === 0){
        loadingFinishedStartGame();
    }
};