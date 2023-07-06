import { getLeftFieldBounds, getRightFieldBounds } from "./Asteroids";
import { getActivePlayer } from "./Player";
import { p } from "@/main";

import Camera from "../objects/Camera";
import Drawable from "./Drawable";

export default class CameraHolder implements Drawable {
    draw(camera: Camera): void {
        const player = getActivePlayer();
        if (!player) return;

        // lerp camera to player
        const targetX = player.x - p.width / 2;
        const targetY = player.y - p.height / 2;
        camera.x += (targetX - camera.x) * 0.1;
        camera.y += (targetY - camera.y) * 0.1;

        // clamp camera between field bounds
        const [left, right] = [getLeftFieldBounds(), getRightFieldBounds()];
        if (camera.x < left) {
            camera.x = left;
        } else if (camera.x + p.width > right) {
            camera.x = right - p.width;
        }
    }
}
