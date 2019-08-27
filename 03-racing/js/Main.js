const moveEverything = () => {
    car.move();
};

const drawEverything = () => {
    //draw the tracks
    drawTracks();

    //playerCar
    drawCar();
};

const loadingFinishedStartGame = () => {
    const framesPerSecond = 30;
    setInterval(()=>{
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);
};

//CANVAS, EVENTS AND ONLOAD SETUP********************
let canvas;
let canvasContext;
window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    //call initialization functions
    carInit();
    initInput();
    loadImages();
    
};
//END CANVAS AND ONLOAD SETUP********************