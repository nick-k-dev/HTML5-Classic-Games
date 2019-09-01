let player1 = new Player();

const moveEverything = () => {
    player1.move();
};

const drawEverything = () => {
    //refresh the screen with black
    drawRect(0,0,canvas.width,canvas.height,'black');

    //playerCar
    drawPlayer(player1);
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
    player1.init(playerPic);
    initInput();
    loadImages();
    
};
//END CANVAS AND ONLOAD SETUP********************