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

const drawCar = () => {
    if(car.picLoaded) {
        drawBitmapCenteredAtLocationWithRotation(carPic, car.x, car.y, car.angle);
    }
}
//END DRAW CALLS*************************