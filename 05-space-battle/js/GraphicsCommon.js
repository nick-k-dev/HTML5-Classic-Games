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

let stars1 = [];
let stars2 = [];
let stars3 = [];
const createStarField = (stars, numStars) => {
    stars[0] = {
        x: 0,
        y: 0,
        radius: Math.random() * 2 + 1
    }
    let half = numStars / 2;
    for(let i = 1; i < numStars; ++i){
        if(i < half){
            stars[i] = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1
            }
        }
        else{
            stars[i] = {
                x: Math.random() * -canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1
            }
        }
    }
}

let stars1FirstHalf = true;
let stars2FirstHalf = true;
let stars3FirstHalf = true;
const resetStars = (stars, whichStars) => {

    let firstHalf = false;
    if(whichStars === 'stars1') {firstHalf = stars1FirstHalf;}
    if(whichStars === 'stars2') {firstHalf = stars2FirstHalf;}
    if(whichStars === 'stars3') {firstHalf = stars3FirstHalf;}

    stars[0] = {
        x: 0,
        y: 0,
        radius: Math.random() * 2 + 1
    }
    let half = stars.length / 2;
    if(firstHalf){
        for(let i = 1; i < half; ++i){
            stars[i] = {
                x: Math.random() * -canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1
            }
        }
        if(whichStars === 'stars1') {stars1FirstHalf = false;}
        if(whichStars === 'stars2') {stars2FirstHalf = false;}
        if(whichStars === 'stars3') {stars3FirstHalf = false;}
    }
    else{
        for(let i = half; i < stars.length; ++i){
            stars[i] = {
                x: Math.random() * -canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1
            }
        }
        if(whichStars === 'stars1') {stars1FirstHalf = true;}
        if(whichStars === 'stars2') {stars2FirstHalf = true;}
        if(whichStars === 'stars3') {stars3FirstHalf = true;}
    }
    
}

const drawStarField = () => {
    
    if((stars1[0].x > canvas.width)){
        resetStars(stars1, 'stars1');
    }
    for(let i = 0; i < stars1.length; ++i){
        drawCircle(stars1[i].x, stars1[i].y, stars1[i].radius, '#333');
        stars1[i].x += 0.15;
    }
    
    if((stars2[0].x > canvas.width)){
        resetStars(stars2, 'stars2');
    }
    for(let i = 0; i < stars2.length; ++i){
        drawCircle(stars2[i].x, stars2[i].y, stars2[i].radius, '#555');
        stars2[i].x += 0.25;
    }

    if((stars3[0].x > canvas.width)){
        resetStars(stars3, 'stars3');
    }
    for(let i = 0; i < stars3.length; ++i){
        drawCircle(stars3[i].x, stars3[i].y, stars3[i].radius, '#222');
        stars3[i].x += 0.15;
    }

}
//END DRAW CALLS*************************