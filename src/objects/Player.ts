import { delta, p } from "@/main";
import { Point } from "@/types";

import gTexture from "@/assets";
import RobotMirrorImage from "@assets/robot_mirror.png";
import RobotImage from "@assets/robot.png";
import Camera from "../objects/Camera";
import Drawable from "./Drawable";
import isKeyDown, { PLAYER } from "@/keys";

let active: Player | null = null;
export default class Player extends Point implements Drawable {
    width = 16;
    height = 22;
    velX = 0;
    velY = 0;
    maxSpeed = 0.1;

    constructor(public x: number, public y: number) {
        super({ x, y });
        active = this;
    }

    update(): void {
        // player movement
        const accel = 0.5;
        if (isKeyDown(PLAYER.LEFT)) {
            this.velX -= delta() * accel;
        }
        if (isKeyDown(PLAYER.RIGHT)) {
            this.velX += delta() * accel;
        }
        if (isKeyDown(PLAYER.UP)) {
            this.velY -= delta() * accel;
        }
        if (isKeyDown(PLAYER.DOWN)) {
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

    draw(): void {
        this.update();

        const flipX = this.velX < 0;

        p.push();
        p.translate(this.x, this.y);
        if (flipX) {
            p.image(gTexture(RobotMirrorImage), 0, 0, this.width, this.height);
        } else {
            p.image(gTexture(RobotImage), 0, 0, this.width, this.height);
        }
        p.pop();
    }

    getCenter(): Point {
        return new Point({
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
        });
    }
}

export function getActivePlayer(): Player | null {
    return active;
}
