/** @type {HTMLCanvasElement} */
//Get the canvas defined in HTML
const canvas = document.getElementById('canvas')
//ctx provides the methods for drawing and image manipulation
const ctx = canvas.getContext('2d');
//Get Canvas Bounds
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
//Selecting the sprite
const spriteImage = new Image();
spriteImage.src = './shadow_dog.png';
const spriteWidth = 575; //defining width of each sprite
const spriteHeight = 523; //defining height of each sprite
//Defining the gameframe which increases by 1 everytime animate() is called
let gameFrame = 0;
//SkipFrames is used to adjust animation speed. Lower value means Higher speed
const skipFrames = 4;
//Create an animationStates object consisting of the number of frames in each animation
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'knockOut',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
]
//Create Array to store all the different animations of the sprite
let spriteAnimations = [];
//Using animationStates to create and store the animations in the spriteAnimations array
animationStates.forEach((state, index)=>{
    let frames = {
        loc: [],
    }
    for(i=0; i<state.frames; i++){
        let posX = i*spriteWidth; //i is the column number of the spritesheet
        let posY = index*spriteHeight; //index is the row number of the spritesheet
        frames.loc.push({x: posX, y: posY}); //pushing each frame location to frames object
    }
    spriteAnimations[state.name] = frames; //adding each frames in spriteAnimations array
})
//Change spriteState according to the dropdown
let spriteState = 'idle';
let dropDown = document.getElementById('animations');
dropDown.addEventListener('change', function(e){
    spriteState = e.target.value;
}) 
//Animate function which is called every animation frame
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);//clearing the canvas every animation frame
    let position = Math.floor(gameFrame/skipFrames) % spriteAnimations[spriteState].loc.length; //this is a modulus operation if an animation has n frames then it will cycle from 0 to n-1 frames
    let frameX = spriteAnimations[spriteState].loc[position].x;
    let frameY = spriteAnimations[spriteState].loc[position].y;
    // ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    ctx.drawImage(spriteImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight); 
    gameFrame++;
    requestAnimationFrame(animate) //animation frames callnack animate function
}
animate()