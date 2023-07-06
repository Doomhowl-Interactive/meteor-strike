import { getLeftFieldBounds, getRightFieldBounds } from "./Asteroids";
import { getActivePlayer } from "./Player";
import { p } from "@/main";

import Camera from "../objects/Camera";
import Drawable from "./Drawable";

export default class CameraHolder implements Drawable {
    constructor(public camera: Camera){

    }

    draw(): void {
        const player = getActivePlayer();
        if (!player) return;

        // lerp camera to player
        const targetX = player.x - p.width / 2;
        const targetY = player.y - p.height / 2;
        this.camera.x += (targetX - this.camera.x) * 0.1;
        this.camera.y += (targetY - this.camera.y) * 0.1;

        // clamp camera between field bounds
        const [left, right] = [getLeftFieldBounds(), getRightFieldBounds()];
        if (this.camera.x < left) {
            this.camera.x = left;
        } else if (this.camera.x + p.width > right) {
            this.camera.x = right - p.width;
        }
    }
}
