import { delta, p } from "@/main";
import { Drawable } from "./Drawable";
import { Camera, Point } from "@/types";

import gTexture from "@/assets";
import RobotMirrorImage from "@assets/robot_mirror.png";
import RobotImage from "@assets/robot.png";

let active: Robot | null = null;
export default class Robot implements Drawable, Point {
    width = 16;
    height = 22;
    velX = 0;
    velY = 0;
    maxSpeed = 0.1;

    constructor(public x: number, public y: number) {
        this.x = x;
        this.y = y;
        active = this;
    }

    update(): void {
        const accel = 0.5;
        if (p.keyIsDown(p.LEFT_ARROW)) {
            this.velX -= delta() * accel;
        }
        if (p.keyIsDown(p.RIGHT_ARROW)) {
            this.velX += delta() * accel;
        }
        if (p.keyIsDown(p.UP_ARROW)) {
            this.velY -= delta() * accel;
        }
        if (p.keyIsDown(p.DOWN_ARROW)) {
            this.velY += delta() * accel;
        }

        // clamp speed
        if (this.velX > this.maxSpeed) {
            this.velX = this.maxSpeed;
        } else if (this.velX < -this.maxSpeed) {
            this.velX = -this.maxSpeed;
        }
        if (this.velY > this.maxSpeed) {
            this.velY = this.maxSpeed;
        } else if (this.velY < -this.maxSpeed) {
            this.velY = -this.maxSpeed;
        }

        // slow down
        this.velX *= 0.99;
        this.velY *= 0.99;

        this.x += this.velX * p.deltaTime;
        this.y += this.velY * p.deltaTime;
    }

    draw(camera: Camera): void {
        this.update();

        const flipX = this.velX < 0;

        p.push();
        p.translate(this.x, this.y);
        p.translate(-camera.x, -camera.y);
        if (flipX) {
            p.image(gTexture(RobotMirrorImage), 0, 0, this.width, this.height);
        } else {
            p.image(gTexture(RobotImage), 0, 0, this.width, this.height);
        }
        p.pop();
    }
}

export function getActivePlayer(): Robot | null {
    return active;
}
