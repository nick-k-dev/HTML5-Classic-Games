let firstPlay = true;
let showingWinScreen = true;
let titleColor = {
    r: 1,
    g: 1,
    b: 1,
    a: 1,
};

const difficulty = {
    EASY: 10,
    NORMAL: 12,
    HARD: 15,
    MIN: 8
};

let ball = {
    x: 75,
    y: 75,
    speedX: 10,
    speedY: 6,
    radius: 10,
    move: function() {
        //paddle left logic
        if(this.x < 0 + BALL_TO_PADDLE_RATIO){
            if(this.y + this.radius > playerOne.y && this.y - this.radius < playerOne.y + PADDLE_HEIGHT){
                this.speedX *= -1;
                let deltaY = this.y-(playerOne.y + PADDLE_HEIGHT/2);
                this.speedY = deltaY * 0.35;
            }
            else{
                ++playerTwo.score;
                this.resetPos();
            }
        }

        //paddle right logic
        if(this.x > canvas.width - BALL_TO_PADDLE_RATIO){
            if(this.y + this.radius > playerTwo.y && this.y - this.radius < playerTwo.y + PADDLE_HEIGHT){
                this.speedX *= -1;//reverse ball's X direction
                let deltaY = this.y-(playerTwo.y + PADDLE_HEIGHT/2);
                this.speedY = deltaY * 0.35;
            }
            else {
                ++playerOne.score;
                this.resetPos();
            }
        }
        
        //top and bottom of the screen logic
        if(this.y > canvas.height - ball.radius || this.y < 0 + ball.radius){
            this.speedY *= -1;
        }

        //move the ball
        this.x += this.speedX;
        this.y += this.speedY;
    },
    resetPos: function(){
        if(playerOne.score >= 3 || playerTwo.score >= 3){
            showingWinScreen = true;
        }
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.speedX *= -1;
        this.speedY *= -1;
    }
}

const PADDLE_HEIGHT = 100, PADDLE_WIDTH = 10, WALL_OFFSET = 10;
const BALL_TO_PADDLE_RATIO = PADDLE_WIDTH + WALL_OFFSET + ball.radius;

let playerOne = {
    x: WALL_OFFSET,
    y: 0,
    score: 0
};
let playerTwo = {
    x: 0,
    y: 0,
    score: 0,
    maxSpeed: 12,
    isComputer: true,
    moveComputerPaddle: function() {
        if(this.y + PADDLE_HEIGHT / 2 + 35 < ball.y)
            this.y += this.maxSpeed;
        else if(this.y + PADDLE_HEIGHT / 2 - 35 > ball.y)
            this.y -= this.maxSpeed;
    }
};

let canvas;
let canvasContext;

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');    

    //handle text details
    canvasContext.font = 'bold 30px helvetica';
    canvasContext.textAlign = 'center';

    //center on screen before listening for mouse
    playerOne.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
    playerTwo.y = canvas.height / 2 - PADDLE_HEIGHT / 2;
    playerTwo.x = canvas.width - WALL_OFFSET - PADDLE_WIDTH;

    //sets up mousemove event listener which calls calculateMousePos and assigns back to paddle
    canvas.addEventListener('mousemove', (evt) => {
        let mousePos = calculateMousePos(evt);
        playerOne.y = mousePos.y - (PADDLE_HEIGHT / 2);

        if(!playerTwo.isComputer)
            playerTwo.y = (mousePos.y - canvas.height) * -1 - (PADDLE_HEIGHT / 2);
    });

    canvas.addEventListener('mousedown', (evt) => {
        if(showingWinScreen){
            firstPlay = false;
            resetGame();
        }
    })

    const framesPerSecond = 30;
    setInterval(()=>{
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    
    if(playerTwo.isComputer){
        setInterval(() => {
            //Make the computer's skill level have some variation based on
            //A speed between 8-18
            playerTwo.maxSpeed = parseInt((Math.random() * difficulty.NORMAL) + difficulty.MIN);
        }, 4000);
    }
}

const resetGame = () => {
    playerOne.score = 0;
    playerTwo.score = 0;
    showingWinScreen = false;
    ball.resetPos();
};

const calculateMousePos = (evt) => {
    const rect = canvas.getBoundingClientRect(), root = document.documentElement;

    //account for the margins, canvas position on page, scroll amount, etc.
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
};

const moveEverything = () => {
    if(showingWinScreen)
        return;

    if(playerTwo.isComputer)
        playerTwo.moveComputerPaddle();
    ball.move();
};

const drawRect = (topLeftX, topLeftY, boxWidth, boxHeight, fillColor) => {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
};

const drawCircle = (centerX, centerY, radius, fillColor) => {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    //Takes x, y, radius, start angle, end angle, anticlockwise
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
    canvasContext.fill();
};

const drawNet = () => {
    for(let i = 0; i < canvas.height; i += 25){
        drawRect(canvas.width /2, i, 3, 15, 'white');
    }
}

const drawScore = () => {
    canvasContext.fillText(playerOne.score + '    ' + playerTwo.score, canvas.width / 2, 50);
    canvasContext.fillText(playerOne.score + '    ' + playerTwo.score, canvas.width / 2 + 1, 51);
}

const drawEverything = () => {
    //Clears the canvas with black
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    
    if(!showingWinScreen){
        //player one rect
        drawRect(playerOne.x, playerOne.y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
        //player two rect
        drawRect(playerTwo.x, playerTwo.y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

        //playerBall
        drawCircle(ball.x, ball.y, ball.radius, 'white');
        drawNet();
        drawScore();
    }
    else {
        canvasContext.fillStyle = 'white';
        let playerMessage = playerOne.score > playerTwo.score ? "Player 1 wins!" : "Player 2 wins!";
        if(firstPlay){
            canvasContext.fillStyle = 'white'
            canvasContext.strokeStyle = 'white';
            playerMessage = "";
            canvasContext.font = 'bold 150px helvetica';
            canvasContext.strokeText("PONG", canvas.width / 2 - 100, 220);
            canvasContext.strokeText("'PONG'", canvas.width / 2 - 100, 216);
            canvasContext.fillText("'PONG'", canvas.width / 2, 340);
            canvasContext.strokeText("'PONG'", canvas.width / 2, 344);
            canvasContext.strokeText("'PONG'", canvas.width / 2 + 100, 460);
            canvasContext.strokeText("'PONG'", canvas.width / 2 + 100, 464);
            canvasContext.font = 'bold 30px helvetica';
        }
        else {
            drawScore();
        }
        canvasContext.fillText(playerMessage, canvas.width / 2, 150);
        canvasContext.fillText('Click mouse to play.', canvas.width /2, canvas.height - 50);
    }
};