let canvas;
let canvasContext;
const MAX_START_UNITS = 8;
let playerUnits = [];

const mouse = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
    isDragging: false
};

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');    

    //sets up mousemove event listener which calls calculateMousePos
    canvas.addEventListener('mousemove', (evt) => {
        const mousePos = calculateMousePos(evt);
        document.getElementById('debugText').innerHTML = `(${mousePos.x},${mousePos.y})`;
        if(mouse.isDragging) {
            mouse.x2 = mousePos.x;
            mouse.y2 = mousePos.y;
        }
    });

    canvas.addEventListener('mousedown', (evt) => {
        const mousePos = calculateMousePos(evt);
        mouse.x1 = mousePos.x;
        mouse.x2 = mousePos.x;
        mouse.y1 = mousePos.y;
        mouse.y2 = mousePos.y;
        mouse.isDragging = true;
    });

    canvas.addEventListener('mouseup', (evt) => {
        mouse.isDragging = false;
    });

    // canvas.addEventListener('click', (evt) => {
    //     const mousePos = calculateMousePos(evt);
    //     playerUnits.forEach((unit) => {
    //         unit.moveNear(mousePos.x, mousePos.y);
    //     });
    // });

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
    if(mouse.isDragging) {
        drawSelectionBox(mouse, '#49f');
    }
};