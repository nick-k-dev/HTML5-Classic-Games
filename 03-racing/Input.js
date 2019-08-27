//KEYBORAD CONSTANTS AND CHECKS**********
const KEY = Object.freeze({
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40
});

let keyHeld = {
    gas: false,
    reverse: false,
    left: false,
    right: false
};

//END KEYBOARD CONSTANTS AND CHECKS*****************

//********LISTENER CALLBACKS
const initInput = () => {
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
};

const setKeyHoldState = (currentKey, pressedState) => {
    if(currentKey === KEY.UP_ARROW) {
        keyHeld.gas = pressedState;
    }
    if(currentKey === KEY.DOWN_ARROW){
        keyHeld.reverse = pressedState;
    }
    if(currentKey === KEY.LEFT_ARROW){
        keyHeld.left = pressedState;
    }
    if(currentKey === KEY.RIGHT_ARROW){
        keyHeld.right = pressedState;
    }
}

const keyPressed = (evt) => {
    setKeyHoldState(evt.keyCode, true);
    evt.preventDefault();
}

const keyReleased = (evt) => {
   setKeyHoldState(evt.keyCode, false);
}
//*********END LISTENER CALLBAKCKS