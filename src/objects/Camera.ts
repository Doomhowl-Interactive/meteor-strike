import {p} from "@/main";
import {Point} from "@/types";

export class Camera extends Point {
    getMouse(): Point {
        return new Point({
            x: p.mouseX + this.x,
            y: p.mouseY + this.y,
        });
    }
}

