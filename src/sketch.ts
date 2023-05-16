let cameraX = 200;
let cameraY = -55;

let rocketTexture: p5.Image;
let crystalBlue: p5.Image;
let crystalGreen: p5.Image;
let robotTexture: p5.Image;

let velX = 0;
let velY = 0;
let maxSpeed = 0.1;

const rng: number[] = [];
function initRng() {
    for (let i = 0; i < 1000; i++) {
        rng.push(Math.random());
    }
}

const delta = () => deltaTime / 1000;

function preload() {
    robotTexture = loadImage("assets/robot.png");
    rocketTexture = loadImage("assets/spaceship2.png");

    crystalBlue = loadImage("assets/BlueCrystal.png");
    crystalGreen = loadImage("assets/CrystalGreen.png");
}

function unblurCanvas() {
    const ctx = document.querySelector("canvas").getContext("2d");
    ctx.imageSmoothingEnabled = false;
    (ctx as any).style = "image-rendering: pixelated";
}

function drawCrystal(x: number, y: number, value: number) {
    push();
    translate(-cameraX, -cameraY);
    translate(x, y);
    switch (value) {
        case 0:
            {
                image(crystalBlue, 0, 0, 20, 20);
            }
            break;
        case 1:
            {
                image(crystalGreen, 0, 0, 20, 23);
            }
            break;
        default:
            throw new Error("No crystal with value " + value);
    }
    pop();
}

interface TerrainLayer {
    yOffset: number;
    yScale: number;
    parallax: number;
    spacing: number;
    col: p5.Color;
}

function graphTerrainLayer(layer: TerrainLayer, i: number) {
    return rng[Math.abs(Math.floor(i))] * layer.yScale;
}

function drawTerrainLayer(layer: TerrainLayer) {
    push();
    translate(
        -cameraX * layer.parallax,
        -cameraY - layer.yOffset * layer.parallax
    );
    fill(layer.col);
    beginShape();
    vertex(0, height);
    const count = 30;
    for (let x = 0; x <= count; x++) {
        vertex(x * layer.spacing, graphTerrainLayer(layer, x));
    }
    vertex(count * layer.spacing, height);
    endShape(CLOSE);
    pop();
}

function renderBackground() {
    const terrain: TerrainLayer[] = [
        {
            col: color(85, 79, 87),
            yOffset: 80,
            yScale: 30,
            parallax: 0.4,
            spacing: 20,
        },
        {
            col: color(180),
            yOffset: -20,
            yScale: 30,
            parallax: 0.6,
            spacing: 30,
        },
    ];
    for (const layer of terrain) {
        drawTerrainLayer(layer);
    }
}

function setup() {
    initRng();
    createCanvas(320, 180);
    frameRate(60);

    unblurCanvas();
}

function drawRocket() {
    push();
    translate(-cameraX, -cameraY);
    translate(300, 0);
    image(rocketTexture, 0, 0, 32, 64);
    pop();
}

function drawRobot() {
    push();
    translate(width / 2, height / 2);
    image(robotTexture, 0, 0);
    pop();

    const accel = 0.5;
    if (keyIsDown(LEFT_ARROW)) {
        velX -= delta() * accel;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        velX += delta() * accel;
    }
    if (keyIsDown(UP_ARROW)) {
        velY -= delta() * accel;
    }
    if (keyIsDown(DOWN_ARROW)) {
        velY += delta() * accel;
    }

    // clamp speed
    if (velX > maxSpeed) {
        velX = maxSpeed;
    } else if (velX < -maxSpeed) {
        velX = -maxSpeed;
    }
    if (velY > maxSpeed) {
        velY = maxSpeed;
    } else if (velY < -maxSpeed) {
        velY = -maxSpeed;
    }

    // slow down
    velX *= 0.99;
    velY *= 0.99;

    cameraX += velX * deltaTime;
    cameraY += velY * deltaTime;
}

function draw() {
    background(11);
    noStroke();
    renderBackground();
    drawRocket();
    drawRobot();

    drawCrystal(370, 50, 0);
    drawCrystal(420, 70, 1);
}
