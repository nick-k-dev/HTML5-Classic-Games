let canvas;
let canvasContext;
const MAX_START_UNITS = 8;
let playerUnits = [];

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');    

    //sets up mousemove event listener which calls calculateMousePos
    canvas.addEventListener('mousemove', (evt) => {
        let mousePos = calculateMousePos(evt);
        document.getElementById('debugText').innerHTML = `(${mousePos.x},${mousePos.y})`;
    });

    canvas.addEventListener('click', (evt) => {
        let mousePos = calculateMousePos(evt);
        playerUnits.forEach((unit) => {
            unit.gotoX = mousePos.x;
            unit.gotoY = mousePos.y;
        });
    })

    for(let i = 0; i < MAX_START_UNITS; ++i){
        playerUnits.push(new Unit());
        playerUnits[i].reset();
    }

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

const moveEverything = () => {
    playerUnits.forEach((unit) => {
        unit.move();
    });
};

const drawEverything = () => {
    //Clears the canvas with black
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    playerUnits.forEach((unit) => {
        unit.draw();
    });
};