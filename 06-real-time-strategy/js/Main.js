let canvas;
let canvasContext;

window.onload = () => {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');    

    //sets up mousemove event listener which calls calculateMousePos
    canvas.addEventListener('mousemove', (evt) => {
        let mousePos = calculateMousePos(evt);
        document.getElementById('debugText').innerHTML = `(${mousePos.x},${mousePos.y})`;
    });

    canvas.addEventListener('mousedown', (evt) => {
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

const moveEverything = () => {
    
};

const drawEverything = () => {
    //Clears the canvas with black
    drawRect(0, 0, canvas.width, canvas.height, 'black');
};