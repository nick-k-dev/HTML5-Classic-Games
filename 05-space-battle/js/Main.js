let player1 = new Player();
let enemy1 = new Enemy();

const moveEverything = () => {
    player1.move();
    enemy1.move();
    player1.checkCollision(enemy1);
};

const drawEverything = () => {
    //refresh the screen with black
    drawRect(0,0,canvas.width,canvas.height,'black');

    //playerCar
    player1.draw();
    enemy1.draw();
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
    enemy1.init(enemyPic);
    initInput();
    loadImages();
    
};
//END CANVAS AND ONLOAD SETUP********************