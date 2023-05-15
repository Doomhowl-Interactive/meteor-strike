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
    ctx.style = "image-rendering: pixelated";
}

class TerrainLayer {
    constructor(col, yOffset, yScale, paralax=1, spacing=30){
        this.yOffset = yOffset;
        this.yScale = yScale;
        this.paralax = paralax;
        this.spacing = spacing;
        this.col = col;
    }

    graph(i){
        return rng[Math.abs(Math.floor(i))]*this.yScale;
    }

    draw(){
        push();
        translate(-cameraX*this.paralax, -cameraY-this.yOffset*this.paralax);
        fill(this.col);
        beginShape();
        vertex(0,height);
        const count = 30;
        for (let x = 0; x <= count; x++) {
            vertex((x)*this.spacing,this.graph(x));
        }
        vertex(count*this.spacing,height);
        endShape(CLOSE)
        pop();
    }
};

function renderBackground() {
    const front = color(85, 79, 87);
    const back = color(200);
    const terrain = [new TerrainLayer(front,80,30,0.4,20), new TerrainLayer(color(180),-20,30) ];
    for (layer of terrain){
        layer.draw();
    }
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
    background(11);
    renderBackground();
    drawRocket();
    drawRobot();
}
