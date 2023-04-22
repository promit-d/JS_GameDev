/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 250;
const CANAVS_HEIGHT = canvas.height = 500;

class Rectangle{
    constructor(x, y, width, height, normColor, dx, dy, collideColor){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = '';
        this.dx = dx;
        this.dy = dy;
        this.normColor = normColor;
        this.collideColor = collideColor;
    }

    update(){
        this.x += this.dx;
        this.y += this.dy;
        if(this.y > canvas.height){
            this.y = 0
        }
        else if(this.y < 0){
            this.y = canvas.height;
        }
    }

    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;        
    }

    
}

var rect1 = new Rectangle(50, 10, 50, 50, "red", 0, 1, "white");
var rect2 = new Rectangle(50, 450, 30, 30, "blue", 0, -1, "black");

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANAVS_HEIGHT);
    collisionDetect(rect1, rect2)
    rect1.update()
    rect1.draw()
    rect2.update()
    rect2.draw()
    // gameFrame++;
    requestAnimationFrame(animate)
}

function collisionDetect(rect1, rect2){
    if(rect1.x > rect2.x + rect2.width || rect1.x + rect1.width < rect2.x || rect1.y > rect2.y + rect2.height || rect1.y + rect1.height < rect2.y){
        rect1.color = rect1.normColor;
        rect2.color = rect2.normColor;
    }
    else{
        rect1.color = rect1.collideColor;
        rect2.color = rect2.collideColor;
    }
}
animate()