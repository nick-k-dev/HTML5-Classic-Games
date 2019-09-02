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

let stars = [];
const createStarField = (numStars) => {
    stars[0] = {
        x: 0,
        y: 0,
        radius: Math.random() * 2 + 1,
        color: '#555'
    }
    let quarter = numStars / 4;
    let half = numStars / 2;
    let threeQaurters = quarter * 3;
    for(let i = 1; i < numStars; ++i){
        if(i < quarter){
            stars[i] = {
                x: Math.random() * -canvas.width,
                y: Math.random() * -canvas.height,
                radius: Math.random() * 2 + 1,
                color: '#555'
            }
        }
        else if(i < half){
            stars[i] = {
                x: Math.random() * canvas.width,
                y: Math.random() * -canvas.height,
                radius: Math.random() * 2 + 1,
                color: '#555'
            }
        }
        else if(i < threeQaurters){
            stars[i] = {
                x: Math.random() * -canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: '#555'
            }
        }
        else{
            stars[i] = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: '#555'
            }
        }
    }
}

const resetSecondHalfStars = () => {
    stars[0] = {
        x: 0,
        y: 0,
        radius: Math.random() * 2 + 1,
        color: '#555'
    }

    let half = stars.length / 2;
    let threeQuarters = (half / 2) * 3;

    for(let i = half; i < stars.length; ++i){
        if(i < threeQuarters){
            stars[i] = {
                x: Math.random() * -canvas.width,
                y: Math.random() * -canvas.height,
                radius: Math.random() * 2 + 1,
                color: '#555'
            }
        }
        else {
            stars[i] = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: '#555'
            }
        }
    }
};

const resetFirstHalfStars = () => {
    stars[0] = {
        x: 0,
        y: 0,
        radius: Math.random() * 2 + 1,
        color: '#555'
    }

    let quarter = stars.length / 4;
    let half = quarter * 2;

    for(let i = 0; i < half; ++i){
        if(i < quarter){
            stars[i] = {
                x: Math.random() * -canvas.width,
                y: Math.random() * -canvas.height,
                radius: Math.random() * 2 + 1,
                color: '#555'
            }
        }
        else {
            stars[i] = {
                x: Math.random() * canvas.width,
                y: Math.random() * -canvas.height,
                radius: Math.random() * 2 + 1,
                color: '#555'
            }
        }
    }
};

let bitToggle = false;
const drawStarField = () => {
    
    if((stars[0].x > canvas.width || stars[0].y > canvas.height)){
        console.log('here');
        if(bitToggle){
            console.log('here1');
            resetFirstHalfStars();
            bitToggle = (!bitToggle);
        }
        else {
            console.log('here2');
            resetSecondHalfStars();
            bitToggle = (!bitToggle);
        }
    }
    for(let i = 0; i < stars.length; ++i){
        drawCircle(stars[i].x, stars[i].y, stars[i].radius, stars[i].color);
        stars[i].x += 2.25
        stars[i].y += 2.25;
    }
    
}
//END DRAW CALLS*************************