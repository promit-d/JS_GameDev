/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANAVS_HEIGHT = canvas.height = 250;

class Circle{
    constructor(x, y, radius, normColor, dx, dy, collideColor){
        this.radius = radius;
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
        if(this.x > canvas.width - this.radius && this.dx>0){
            this.x = 0 - this.radius
        }
        else if(this.x < 0 + this.radius && this.dx<0){
            this.x = canvas.width + this.radius;
        }
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;   
        // ctx.strokeStyle = "red";
        ctx.fill();
        // ctx.stroke();
        
             
    }

    
}

var circ1 = new Circle(10, 70, 50, "red", 1, 0, "white");
var circ2 = new Circle(50, 70, 30, "blue", -1, 0, "black");

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANAVS_HEIGHT);
    collisionDetect(circ1, circ2)
    circ1.update()
    circ1.draw()
    circ2.update()
    circ2.draw()
    // gameFrame++;
    requestAnimationFrame(animate)
}

function collisionDetect(circ1, circ2){
    let dx = circ2.x - circ1.x;
    let dy = circ2.y - circ1.y;

    let distance = Math.sqrt(dx * dx + dy * dy);
    let sumOfRadii = circ1.radius + circ2.radius;

    if(distance < sumOfRadii){
        circ1.color = circ1.collideColor;
        circ2.color = circ2.collideColor;
    }
    else{
        circ1.color = circ1.normColor;
        circ2.color = circ2.normColor;
    }
}
animate()