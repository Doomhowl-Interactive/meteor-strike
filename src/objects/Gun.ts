import { p } from "@/main";
import { Point } from "@/types";
import { getActivePlayer } from "./Player";

import Camera from "../objects/Camera";
import Drawable from "./Drawable";

export default class Gun implements Drawable {
    draw(camera: Camera): void {
        const player = getActivePlayer();
        if (!player) return;

        const worldMouse = new Point({
            x: p.mouseX + camera.x,
            y: p.mouseY + camera.y,
        });

        const angle = p.atan2(worldMouse.y - player.y, worldMouse.x - player.x);

        const pos = player.getCenter();
        pos.x += 5;

        p.push();
        p.translate(pos.x, pos.y);
        p.translate(-camera.x, -camera.y);
        p.rotate(angle);
        p.fill(0);
        p.rect(0, 0, 10, 3);
        p.pop();
    }
}
