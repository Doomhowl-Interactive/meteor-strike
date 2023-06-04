import { p } from "../main";
import { Camera } from "../types";
import { gTexture } from "../utils";
import { Drawable } from "./Drawable";

export default class Rocket implements Drawable {
    draw(camera: Camera): void {
        p.push();
        p.translate(-camera.x, -camera.y);
        p.translate(300, 0);
        p.image(gTexture("spaceship2"), 0, 0, 32, 64);
        p.pop();
    }
}
