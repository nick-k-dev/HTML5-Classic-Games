const BRICK = Object.freeze({
    WIDTH: 80,
    HEIGHT: 20,
    GAP: 2,
    COLUMNS: 10,
    ROWS: 14,
    drawBricks: function(){
        for(let column = 0; column < this.COLUMNS; ++column){
            for(let row = 0; row < this.ROWS; ++row){
                //compute the corner in pixel coordinates of the corresponding brick
                //multiply the brick's title coordinate by WIDTH or HEIGHT for pixel
                let brickLeftEdgeX = column * this.WIDTH;
                let brickTopEdgeY = row * this.HEIGHT;
                //draw a blue rectangle at that position, leaving a small margin for GAP
                drawRect(brickLeftEdgeX, brickTopEdgeY, this.WIDTH - this.GAP, this.HEIGHT - this.GAP, 'blue');
            }//end for
        }//end for
    }//end drawBricks
});

let brickGrid = new Array(BRICK.COLUMNS * BRICK_ROWS);


//PADDLE AND BALL LOGIC***********************
let ball = {
    x: 75,
    y: 75,
    speedX: 10,
    speedY: 6,
    radius: 10,
    shouldReset: false,
    move: function() {
        //paddle hit logic

        if(this.y > canvas.height - BALL_TO_PADDLE_RATIO && this.speedY > 0){
            if(this.x + this.radius > playerOne.x && this.x - this.radius - FORGIVENESS_MARGIN < playerOne.x + PADDLE_WIDTH + FORGIVENESS_MARGIN && !(this.shouldReset)){
                this.speedY *= -1;
                let deltaX = this.x-(playerOne.x + PADDLE_WIDTH/2);
                this.speedX = deltaX * 0.35;
                this.shouldReset = false;
            }
            else if(this.y > canvas.height - BALL_TO_PADDLE_RATIO + PADDLE_HEIGHT) {
                this.shouldReset = true;
            }
        }
        
        if(this.y > canvas.height && this.shouldReset){
            this.resetPos();
            this.shouldReset = false;
        }
        
        //top and bottom of the screen logic
        if(this.y < 0 + this.radius){
            this.speedY *= -1;
        }

        if(this.x < 0 + this.radius || this.x > canvas.width - this.radius){
            this.speedX *= -1;
        }

        //move the ball
        this.x += this.speedX;
        this.y += this.speedY;
    },
    resetPos: function(){
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.speedX *= -1;
        this.speedY *= -1;
    }
}

const PADDLE_HEIGHT = 15, PADDLE_WIDTH = 100, PADDLE_Y_WALL_OFFSET = 50;
const BALL_TO_PADDLE_RATIO = PADDLE_HEIGHT + PADDLE_Y_WALL_OFFSET + ball.radius;
const FORGIVENESS_MARGIN = 4;

let playerOne = {
    y: PADDLE_Y_WALL_OFFSET,
    score: 0
};

const resetGame = () => {
    ball.resetPos();
};


const moveEverything = () => {
    ball.move();
};

//ENDPADDLE AND BALL LOGIC***********************



//CANVAS, EVENTS AND ONLOAD SETUP********************
let canvas;
let canvasContext;
window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');    

    //center on screen before listening for mouse
    playerOne.x = canvas.width / 2 - PADDLE_WIDTH / 2;
    playerOne.y = canvas.height - PADDLE_HEIGHT - PADDLE_Y_WALL_OFFSET;

    //sets up mousemove event listener which calls calculateMousePos and assigns back to paddle
    canvas.addEventListener('mousemove', (evt) => {
        let mousePos = calculateMousePos(evt);
        playerOne.x = mousePos.x - (PADDLE_WIDTH / 2);
    });

    canvas.addEventListener('mousedown', (evt) => {
       resetGame();
    })

    const framesPerSecond = 30;
    setInterval(()=>{
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);
}

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
//END CANVAS AND ONLOAD SETUP********************


//DRAW CALLS*************************
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

const drawEverything = () => {
    //Clears the canvas with black
    drawRect(0, 0, canvas.width, canvas.height, 'black');

    //draw the bricks
    BRICK.drawBricks();
    

    //player one rect
    drawRect(playerOne.x, playerOne.y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

    //playerBall
    drawCircle(ball.x, ball.y, ball.radius, 'white');
};
//END DRAW CALLS*************************