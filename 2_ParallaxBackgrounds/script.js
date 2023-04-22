/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 10; //Determines the speed at which the background will be moving.

//Saving the Background Layers as images 
const bg_Layer1 = new Image();
bg_Layer1.src = './layer-1.png';
const bg_Layer2 = new Image();
bg_Layer2.src = './layer-2.png';
const bg_Layer3 = new Image();
bg_Layer3.src = './layer-3.png';
const bg_Layer4 = new Image();
bg_Layer4.src = './layer-4.png';
const bg_Layer5 = new Image();
bg_Layer5.src = './layer-5.png';

window.addEventListener('load', function () { //Do all the task after document loads
    const slider = document.getElementById('slider');
    slider.value = gameSpeed;
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = gameSpeed;
    slider.addEventListener('change', function (e) {
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = gameSpeed;
    })
    //Define class Layer which will help controlling each layers as required
    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400; //width of the image
            this.height = 700; //height of the image
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }

        update() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width) {
                this.x = 0;
            }
            this.x = Math.floor(this.x - this.speed);
        }

        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }

    const layer1 = new Layer(bg_Layer1, 0.2);
    const layer2 = new Layer(bg_Layer2, 0.4);
    const layer3 = new Layer(bg_Layer3, 0.6);
    const layer4 = new Layer(bg_Layer4, 0.8);
    const layer5 = new Layer(bg_Layer5, 1);

    const gameObjects = [layer1, layer2, layer3, layer4, layer5];

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        gameObjects.forEach((layer) => {
            layer.update();
            layer.draw()
        })
        requestAnimationFrame(animate);
    }
    animate();
})