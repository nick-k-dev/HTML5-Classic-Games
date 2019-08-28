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

const drawBitmapCenteredAtLocationWithRotation = (graphic, x, y, angle) => {
    canvasContext.save();//allows us to undo translate movement and rotate spin
    canvasContext.translate(x, y); //sets the point where our graphic will go
    canvasContext.rotate(angle); // sets the rotation
    canvasContext.drawImage(graphic, -graphic.width/2, -graphic.height/2); //center, draw
    canvasContext.restore();
}

const drawCar = (car) => {
    drawBitmapCenteredAtLocationWithRotation(car.bitMap, car.x, car.y, car.angle);
}

const drawStartScreen = () => {
    
    drawRect(0,150, canvas.width, canvas.height - 150, '#ffe3e3');
    for(let i = 25; i < canvas.width; i += 100){
        if(i === 325)
            continue;
        drawRect(i,canvas.height/2, 50, 20, '#bebdbd');
    }
    drawBitmapCenteredAtLocationWithRotation(menuPic, canvas.width/2, canvas.height/2, 0);
    drawRect(0,150, canvas.width, canvas.height - 150, 'rgba(1,0,1,0.6');
    drawRect(0,0, canvas.width, 150, 'black');
    drawRect(0,canvas.height - 150, canvas.width, canvas.height/2, 'black');
    canvasContext.fillStyle = 'white'
    canvasContext.strokeStyle = 'white';
    canvasContext.font = 'bold 100px helvetica';
    canvasContext.fillText("CAR RACER", 100, 100);
    canvasContext.strokeText("CAR RACER", 104, 100);
    canvasContext.font = 'bold 30px helvetica';
    canvasContext.strokeText("'It's a race! I hope I win!'", canvas.width / 2 + 40, 140);
    canvasContext.strokeText("'It's a race! I hope I win!'", canvas.width / 2 + 40, 140);
    canvasContext.font = 'bold 30px helvetica';
    canvasContext.strokeText("Player 1: WASD keys | Player 2: Arrow Keys", 90, 500);
    canvasContext.strokeText("Press 'Enter' to begin", 260, 560);
};
//END DRAW CALLS*************************