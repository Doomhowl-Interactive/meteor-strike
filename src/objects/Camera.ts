import { p } from "@/main";
import { Point } from "@/types";
import Drawable from "./Drawable";

export default class Camera extends Point implements Drawable {
    getMouse(): Point {
        return new Point({
            x: p.mouseX + this.x,
            y: p.mouseY + this.y,
        });
    }

    draw(): void {
        p.camera(this.x, this.y, 1000, this.x, this.y, 0, 0, 1, 0);
    }
}
