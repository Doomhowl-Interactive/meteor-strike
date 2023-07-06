import { p } from "@/main";
import { getActivePlayer } from "./Player";

import Drawable from "./Drawable";

export default class Gun implements Drawable {
    draw(): void {
        const player = getActivePlayer();
        if (!player) return;

        const pos = player.getCenter();
        pos.x += 5;

        p.push();
        p.translate(pos.x, pos.y);
        p.rotate(0);
        p.fill(0);
        p.rect(0, 0, 10, 3);
        p.pop();
    }
}
