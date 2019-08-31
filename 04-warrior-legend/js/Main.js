let displayStartScreen = true;

let player1 = new Warrior();

const moveEverything = () => {
    player1.move();
};

const drawEverything = () => {
    //draw the tracks
    drawRoom();
    //playerCar
    player1.draw(); 
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
    player1.init(playerPic, "Randall the dude");
    initInput();
    loadImages();
    
};
//END CANVAS AND ONLOAD SETUP********************