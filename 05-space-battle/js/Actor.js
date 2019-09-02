class Actor {
    constructor(){
        this.xv = 0;
        this.yv = 0;
        this.x = 0;
        this.y = 0;
    }

    handleScreenWrap() {
        if(this.x < 0) {this.x += canvas.width;}
        else if(this.x > canvas.width) {this.x -= canvas.width;}
        
        if(this.y < 0) {this.y += canvas.height;}
        else if(this.y > canvas.height) {this.y -= canvas.height;}
    }

    move() {
        this.x += this.xv;
        this.y += this.yv;
        //console.log(this.x + "," + this.y + " | v " + this.xv + "," +  this.yv);
        this.handleScreenWrap();
    }

    reset() {
        this.xv = 0;
        this.yv = 0;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
    }
}