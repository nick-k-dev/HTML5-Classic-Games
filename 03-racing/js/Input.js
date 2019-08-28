//KEYBORAD CONSTANTS AND CHECKS**********
const KEY = Object.freeze({
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
    W: 87,
    A: 65,
    S: 83,
    D: 68
});
//END KEYBOARD CONSTANTS AND CHECKS*****************

//********LISTENER CALLBACKS
const initInput = () => {
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
    players.player1.setupControls(KEY.UP_ARROW, KEY.DOWN_ARROW, KEY.LEFT_ARROW, KEY.RIGHT_ARROW);
    players.player2.setupControls(KEY.W, KEY.S, KEY.A, KEY.D);
};

const setKeyHoldState = (currentKey, car, pressedState) => {
    if(currentKey === car.keyForGas) {
        car.keyHeld.gas = pressedState;
    }
    if(currentKey === car.keyForReverse){
        car.keyHeld.reverse = pressedState;
    }
    if(currentKey === car.keyForLeft){
        car.keyHeld.left = pressedState;
    }
    if(currentKey === car.keyForRight){
        car.keyHeld.right = pressedState;
    }
}

const keyPressed = (evt) => {
    Object.keys(players).forEach(function(p){
        setKeyHoldState(evt.keyCode, players[p], true);
    });
    evt.preventDefault();
}

const keyReleased = (evt) => {
    Object.keys(players).forEach(function(p){
        setKeyHoldState(evt.keyCode, players[p], false);
    });
}
//*********END LISTENER CALLBAKCKS