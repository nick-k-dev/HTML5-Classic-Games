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
    player1.setupControls(KEY.UP_ARROW, KEY.DOWN_ARROW, KEY.LEFT_ARROW, KEY.RIGHT_ARROW);
};

const setKeyHoldState = (currentKey, player, pressedState) => {
    if(currentKey === player.keyForGas) {
        player.keyHeld.gas = pressedState;
    }
    if(currentKey === player.keyForReverse){
        player.keyHeld.reverse = pressedState;
    }
    if(currentKey === player.keyForLeft){
        player.keyHeld.left = pressedState;
    }
    if(currentKey === player.keyForRight){
        player.keyHeld.right = pressedState;
    }
}

const keyPressed = (evt) => {
    setKeyHoldState(evt.keyCode, player1, true);
    evt.preventDefault();
}

const keyReleased = (evt) => {
    setKeyHoldState(evt.keyCode, player1, false);
}
//*********END LISTENER CALLBAKCKS