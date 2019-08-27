const moveEverything = () => {
    car.move();
};

const drawEverything = () => {
    //Clears the canvas with black
    drawRect(0, 0, canvas.width, canvas.height, 'black');

    //draw the tracks
    drawTracks();

    //playerCar
    drawCar();
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

    const framesPerSecond = 30;
    setInterval(()=>{
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);
};
//END CANVAS AND ONLOAD SETUP********************