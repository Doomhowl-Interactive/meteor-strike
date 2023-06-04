import { p } from "../main";
import { Camera } from "../types";
import { gTexture } from "../utils";
import { Drawable } from "./Drawable";

export default class Crystal implements Drawable {
    constructor(public x: number, public y: number, public value: number) {}

    draw(camera: Camera): void {
        p.push();
        p.translate(-camera.x, -camera.y);
        p.translate(this.x, this.y);
        switch (this.value) {
            case 0:
                p.image(gTexture("BlueCrystal"), 0, 0, 20, 20);
                break;
            case 1:
                p.image(gTexture("CrystalGreen"), 0, 0, 20, 23);
                break;
            default:
                throw new Error("No crystal with value " + this.value);
        }
        p.pop();
    }
}