let primary = 0;
let secondary = 200;

let cameraX = -90;
let cameraY = -55;
let rocketTexture;

let texture;
let velX = 0;
let velY = 0;
let maxSpeed = 0.1;

const delta = () => deltaTime / 1000;

function preload(){
    texture = loadImage("assets/robot.png");
    rocketTexture = loadImage("assets/spaceship2.png");
}

function unblurCanvas() {
    const ctx = document.querySelector("canvas").getContext("2d");
    ctx.imageSmoothingEnabled = false;
}

function setup() {
    createCanvas(320, 180);
    setFrameRate(60);

    unblurCanvas();
}

function drawRocket() {
    push();
    translate(-cameraX, -cameraY);
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
    console.log(cameraX, cameraY);
}

function draw() {
    background(secondary);
    drawRocket();
    drawRobot();
}
