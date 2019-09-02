const  ENEMY = Object.freeze({
    SPEED: 1.9,
    DIRECTION_CHANGE_DELAY: 85,
    UFO1_COLLISION_RADIUS: 32,
    UFO2_COLLISION_RADIUS: 32,
    UFO3_COLLISION_RADIUS: 32,
    UFO4_COLLISION_RADIUS: 32
});

class Enemy extends Actor {
    constructor(){
        super();
    }

    move() {
        super.move();
        --this.cyclesUntilDirectionChange;
        if(this.cyclesUntilDirectionChange <= 0) {
            const randomAngle = Math.random() * Math.PI * 2.0;
            this.xv = Math.cos(randomAngle) * ENEMY.SPEED;
            this.yv = Math.sin(randomAngle) * ENEMY.SPEED;
            this.cyclesUntilDirectionChange = ENEMY.DIRECTION_CHANGE_DELAY;
        }
    }

    hasCollided(collisionX, collisionY) {
        const deltaX = collisionX - this.x;
        const deltaY = collisionY - this.y;
        const distance = Math.sqrt((deltaX*deltaX) + (deltaY*deltaY)); 
        return (distance <= this.COLLISION_RADIUS);
    }

    reset() {
        super.reset();
        this.cyclesUntilDirectionChange = 0;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    }

    init(graphic, collisionRadius) {
        this.bitMap = graphic;
        this.COLLISION_RADIUS = collisionRadius;
        this.reset();
    }

    draw() {
        drawBitmapCenteredAtLocationWithRotation(this.bitMap, this.x, this.y, 0);
    }
}