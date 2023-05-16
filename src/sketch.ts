let cameraX = 200;
let cameraY = -55;

let velX = 0;
let velY = 0;
let maxSpeed = 0.1;

interface Drawable {
    draw(): void;
}

class Crystal implements Drawable {
    constructor(public x: number, public y: number, public value: number) {}

    draw(): void {
        push();
        translate(-cameraX, -cameraY);
        translate(this.x, this.y);
        switch (this.value) {
            case 0:
                {
                    image(gTexture("BlueCrystal"), 0, 0, 20, 20);
                }
                break;
            case 1:
                {
                    image(gTexture("CrystalGreen"), 0, 0, 20, 23);
                }
                break;
            default:
                throw new Error("No crystal with value " + this.value);
        }
        pop();
    }
}

class Rocket implements Drawable {
    draw(): void {
        push();
        translate(-cameraX, -cameraY);
        translate(300, 0);
        image(gTexture("spaceship2"), 0, 0, 32, 64);
        pop();
    }
}

class Robot implements Drawable {
    width = 16;
    height = 22;

    update(): void {
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

    draw(): void {
        this.update();

        const flipX = velX < 0;

        push();
        translate(width / 2, height / 2);
        translate(this.width / -2, this.width / -2);
        if (flipX) {
            image(gTexture("robot_mirror"), 0, 0, this.width, this.height);
        } else {
            image(gTexture("robot"), 0, 0, this.width, this.height);
        }
        pop();
    }
}

let world: Drawable[];

function setup() {
    createCanvas(320, 180);
    frameRate(60);
    unblurCanvas();

    world = [
        createTerrain(),
        new Rocket(),
        new Robot(),
        new Crystal(370, 50, 0),
        new Crystal(420, 70, 1),
    ];
}

function draw() {
    background(11);
    noStroke();
    world.forEach((obj) => obj.draw());
}
