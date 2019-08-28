let player1 = new Car();

const moveEverything = () => {
    player1.move();
};

const drawEverything = () => {
    //draw the tracks
    drawTracks();

    //playerCar
    drawCar(player1);
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
    player1.init();
    initInput();
    loadImages();
    
};
//END CANVAS AND ONLOAD SETUP********************