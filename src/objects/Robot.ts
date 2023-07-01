import { delta, p } from "@/main";
import { Drawable } from "./Drawable";
import { Camera } from "@/types";

import gTexture from "@/assets";
import RobotMirrorImage from "@assets/robot_mirror.png";
import RobotImage from "@assets/robot.png";

export default class Robot implements Drawable {
    width = 16;
    height = 22;
    velX = 0;
    velY = 0;
    maxSpeed = 0.1;

    update(camera: Camera): void {
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

        camera.x += this.velX * p.deltaTime;
        camera.y += this.velY * p.deltaTime;
    }

    draw(camera: Camera): void {
        this.update(camera);

        const flipX = this.velX < 0;

        p.push();
        p.translate(p.width / 2, p.height / 2);
        p.translate(this.width / -2, this.width / -2);
        if (flipX) {
            p.image(gTexture(RobotMirrorImage), 0, 0, this.width, this.height);
        } else {
            p.image(gTexture(RobotImage), 0, 0, this.width, this.height);
        }
        p.pop();
    }
}
