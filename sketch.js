let primary = 0;
let secondary = 200;

let cameraX = 200;
let cameraY = -55;
let rocketTexture;

let texture;
let velX = 0;
let velY = 0;
let maxSpeed = 0.1;

const rng = [];
function initRng(){
    for (let i = 0; i < 1000; i++) {
      rng.push(Math.random());
    }
}

const delta = () => deltaTime / 1000;

function preload(){
    texture = loadImage("assets/robot.png");
    rocketTexture = loadImage("assets/spaceship2.png");
}

function unblurCanvas() {
    const ctx = document.querySelector("canvas").getContext("2d");
    ctx.imageSmoothingEnabled = false;
}

class TerrainLayer {
    constructor(yOffset, yScale){
        this.yOffset = yOffset;
        this.yScale = yScale;
    }

    graph(i){
        return rng[Math.abs(Math.floor(i))]*this.yScale;
    }

    draw(){
        const seg = width / 10;
        for (let x = cameraX; x <= cameraX+width+seg; x += seg) {
            let j = x / seg;
            let smoothX = Math.floor(cameraX) % seg;
            line(x-seg-smoothX,this.graph(j-1),x-smoothX,this.graph(j));
        }
    }
};

function renderBackground() {
    push();
    translate(-cameraX, -cameraY);
    const terrain = [new TerrainLayer(20,50)];
    for (layer of terrain){
        layer.draw();
    }
    pop();
}

function setup() {
    initRng();
    createCanvas(320, 180);
    setFrameRate(60);

    unblurCanvas();
}

function drawRocket() {
    push();
    translate(-cameraX, -cameraY);
    translate(300,0);
    image(rocketTexture, 0, 0, 32,64);
    pop();
}

function drawRobot() {
    push();
        translate(width/2,height/2);
        fill(primary);
        image(texture,0,0);
    pop();

    const accel = 0.5;
    if (keyIsDown(LEFT_ARROW)){
        velX -= delta() * accel;
    }
    if (keyIsDown(RIGHT_ARROW)){
        velX += delta() * accel;
    }
    if (keyIsDown(UP_ARROW)){
        velY -= delta() * accel;
    }
    if (keyIsDown(DOWN_ARROW)){
        velY += delta() * accel;
    }

    // clamp speed
    if (velX > maxSpeed) {
        velX = maxSpeed;
    } else if (velX < -maxSpeed){
        velX = -maxSpeed;
    }
    if (velY > maxSpeed) {
        velY = maxSpeed;
    } else if (velY < -maxSpeed){
        velY = -maxSpeed;
    }

    // slow down
    velX *= 0.99;
    velY *= 0.99;

    cameraX += velX*deltaTime;
    cameraY += velY*deltaTime;
    // console.log(cameraX, cameraY);
}

function draw() {
    background(secondary);
    renderBackground();
    drawRocket();
    drawRobot();
}
