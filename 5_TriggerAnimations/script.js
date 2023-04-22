/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;

const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();


class Explosion {
    constructor(x, y){
        this.image = new Image();
        this.image.src = './boom.png';
        this.sound = new Audio();
        this.sound.src = './explosion.wav'        
        this.spritewidth = 200;
        this.spriteHeight = 179;
        this.width = this.spritewidth * 0.5;
        this.height = this.spriteHeight * 0.5;
        this.x = x;
        this.y = y;   
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * (Math.PI*2) 
    }
    update(){
        if(this.frame === 0) this.sound.play();
        this.timer++;
        if(this.timer % 10 === 0){
            this.frame++;
        }
        
    }
    draw(){
        ctx.save()
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle)
        ctx.drawImage(this.image, this.spritewidth * this.frame, 0, this.spritewidth, this.spriteHeight, 0 - this.width * 0.5, 0 - this.width * 0.5, this.width, this.height);
        ctx.restore()
        // ctx.drawImage(this.image, this.spritewidth * this.frame, 0, this.spritewidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        // ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        // ctx.fillStyle = 'black';
        // ctx.fillRect(this.x - canvasPosition.left -25, this.y - canvasPosition.top -25, 50, 50);
    }
}

document.addEventListener('click', (e)=>{
    createAnimation(e)    
});

// document.addEventListener('mousemove', (e)=>{
//     createAnimation(e)    
// });

function createAnimation(e){
    let positionX = e.x - canvasPosition.left
    let positionY = e.y - canvasPosition.top
    // ctx.fillStyle = 'white';
    // ctx.fillRect(e.x - canvasPosition.left -25, e.y - canvasPosition.top -25, 50, 50);
    
    explosions.push(new Explosion(positionX, positionY))
    console.log(explosions)
    // let image = new Image();
    // image.src = './boom.png'
    // image.addEventListener('load', ()=>{
    //     // ctx.drawImage(image, positionX, positionY);
    //     // ctx.drawImage(image, 200 * 0, 0, 200, 179, e.x, e.y, 200*0.5, 179*0.5);

    // })
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    explosions.forEach((explosion)=>{
        explosion.update();
        explosion.draw();
        if(explosion.frame > 5){
            explosions.splice(explosion, 1)
        }
    })
    requestAnimationFrame(animate);
}

animate()