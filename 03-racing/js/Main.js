let displayStartScreen = true;

let players = {
    player1: new Car(),
    player2: new Car()
};

const moveEverything = () => {
    Object.keys(players).forEach(function(p) {
        players[p].move();
    });
};

const drawEverything = () => {
    if(displayStartScreen){
        drawStartScreen(menuPic);
    }
    else {
    //draw the tracks
    drawTracks();
    //playerCar
    Object.keys(players).forEach(function(p) {
        drawCar(players[p]);
    });
    }
   
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
    players.player2.init(carPic2, "Pink Car");
    players.player1.init(carPic1, "Blue Car");
    initInput();
    loadImages();
    
};
//END CANVAS AND ONLOAD SETUP********************