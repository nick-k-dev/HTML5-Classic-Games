let canvas;
let canvasContext;
let testUnit;

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');    
    testUnit = new Unit();

    //sets up mousemove event listener which calls calculateMousePos
    canvas.addEventListener('mousemove', (evt) => {
        let mousePos = calculateMousePos(evt);
        document.getElementById('debugText').innerHTML = `(${mousePos.x},${mousePos.y})`;
    });

    canvas.addEventListener('click', (evt) => {
        let mousePos = calculateMousePos(evt);
        testUnit.gotoX = mousePos.x;
        testUnit.gotoY = mousePos.y;
    })

    testUnit.reset();

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
    testUnit.move();
};

const drawEverything = () => {
    //Clears the canvas with black
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    testUnit.draw();
};