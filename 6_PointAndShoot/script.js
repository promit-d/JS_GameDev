/**@type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let score = 0;
ctx.font = '50px Impact';

let gameOver = false;

let ravens = [];

class Raven{
        constructor(){
            this.image = new Image();
            this.image.src = './raven.png'
            this.spriteWidth = 271;
            this.spriteHeight = 194;
            this.sizeModifier = Math.random() * 0.6 + 0.4;
            this.width = this.spriteWidth * this.sizeModifier;
            this.height = this.spriteHeight * this.sizeModifier;
            this.x = canvas.width;
            this.y = Math.random() * (canvas.height - this.height)
            this.directionX = Math.random() * 5 + 3;
            this.directionY = Math.random() * 5 - 2.5;
            this.markedForDeletion = false;
            this.frame = 0;
            this.maxFrame = 4;
            this.timeSinceFlap = 0;
            this.flapInterval = Math.random() * 50 + 50;
            this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
            this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
            this.hasTrail = Math.random() > 0.5;
        }
        update(deltatime){
            if(this.y < 0 || this.y > canvas.height - this.height) this.directionY = this.directionY * -1;
            this.x -= this.directionX;
            this.y += this.directionY;
            if(this.x < 0 - this.width) this.markedForDeletion = true;
            this.timeSinceFlap += deltatime;
            if(this.timeSinceFlap > this.flapInterval){
                if(this.frame > this.maxFrame) this.frame = 0;
                else this.frame++;
                this.timeSinceFlap = 0;
                if(this.hasTrail){
                    for(let i = 0; i < 5; i++){
                        particles.push(new Particle(this.x, this.y, this.width, this.color));
                    }
                }                
            }
            if(this.x < 0 - this.width) gameOver = true;           
        }
        draw(){
            // ctx.fillStyle = red;
            // console.log(this.color);
            collisionCtx.fillStyle = this.color;
            collisionCtx.fillRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
}

// const raven = new Raven();

let explosions = [];

class Explosion{
    constructor(x, y, sizeX, sizeY){
        this.image = new Image();
        this.image.src = './boom.png';
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = sizeX;
        this.height = sizeY;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = './explosion.wav'
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.markedForDeletion = false
    }
    update(deltatime){
        if(this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltatime;
        if(this.timeSinceLastFrame > this.frameInterval){
            this.frame++;
            this.timeSinceLastFrame = 0;
            if(this.frame > 5) this.markedForDeletion = true;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

let particles = [];
class Particle {
    constructor(x, y, size, color){
        this.size = size;
        this.x = x + this.size/2 + Math.random() * 50 - 25;
        this.y = y + this.size/3 + Math.random() * 50 - 25;
        
        this.radius = Math.random() * this.size/10;
        this.maxRadius = Math.random() * 20 + 35;
        this.markedForDeletion = false;
        this.speedX = Math.random() * 1 + 0.5;
        this.color = color;
    }
    update(){
        this.x += this.speedX;
        this.radius += 0.5;
        if(this.radius > this.maxRadius - 5) this.markedForDeletion = true;
    }
    draw(){
        ctx.save()
        ctx.globalAlpha = 1 - this.radius/this.maxRadius;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore()
    }
}

function drawScore(){
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 55, 80);
}
function drawGameOver(){
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText("GAME OVER. Score: "+ score, canvas.width * 0.5, canvas.height * 0.5);
    ctx.fillStyle = 'white';
    ctx.fillText("GAME OVER. Score: "+ score, canvas.width * 0.5 + 5, canvas.height * 0.5 + 5);
}

window.addEventListener('click', function(e){
    // console.log(e.x, e.y);
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    console.log(detectPixelColor)
    let pxColor = detectPixelColor.data
    ravens.forEach((raven) => {
        if(raven.randomColors[0] === pxColor[0] && raven.randomColors[1] === pxColor[1] && raven.randomColors[2] === pxColor[2]){
            raven.markedForDeletion = true;
            score++;
            explosions.push(new Explosion(raven.x, raven.y, raven.width, raven.height))
            console.log(explosions)
        }
    });
})

function animate(timestamp){
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // raven.update()
    // raven.draw()
    let deltatime =  timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += deltatime;
    // console.log(deltatime);
    if(timeToNextRaven > ravenInterval){
        ravens.push(new Raven());
        timeToNextRaven = 0;
        // console.log(ravens)
        ravens.sort((a, b) => a.width - b.width)
    };
    drawScore();
    [...particles, ...ravens, ...explosions].forEach(object => object.update(deltatime));
    [...particles, ...ravens, ...explosions].forEach(object => object.draw())
    ravens = ravens.filter(object => !object.markedForDeletion);
    explosions = explosions.filter(object => !object.markedForDeletion);
    particles = particles.filter(object => !object.markedForDeletion);
    // console.log(ravens);
    if(!gameOver) requestAnimationFrame(animate)
    else drawGameOver()
}
animate(0)