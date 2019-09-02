let player1 = new Player();
let enemy1 = new Enemy();
let enemy2 = new Enemy();
let enemy3 = new Enemy();
let enemy4 = new Enemy();

const moveEverything = () => {
    player1.move();
    enemy1.move();
    enemy2.move();
    enemy3.move();
    enemy4.move();
    player1.checkCollision(enemy1);
    player1.checkCollision(enemy2);
    player1.checkCollision(enemy3);
    player1.checkCollision(enemy4);
};

const drawEverything = () => {
    //refresh the screen with black
    drawRect(0,0,canvas.width,canvas.height,'black');
    drawStarField();

    player1.draw();
    enemy1.draw();
    enemy2.draw();
    enemy3.draw();
    enemy4.draw();
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
    enemy1.init(enemyPic1, ENEMY.UFO1_COLLISION_RADIUS);
    enemy2.init(enemyPic2, ENEMY.UFO2_COLLISION_RADIUS);
    enemy3.init(enemyPic3, ENEMY.UFO3_COLLISION_RADIUS);
    enemy4.init(enemyPic4, ENEMY.UFO4_COLLISION_RADIUS);
    initInput();
    loadImages();
    createStarField(stars1, 150);
    createStarField(stars2, 150);
    createStarField(stars3, 150);
};
//END CANVAS AND ONLOAD SETUP********************