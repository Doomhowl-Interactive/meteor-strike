import { p } from "@/main";
import { Camera } from "@/types";
import { Drawable } from "./Drawable";

import gTexture from "@/assets";
import SpaceShipImage from "@assets/spaceship2.png";

export default class Rocket implements Drawable {
    draw(camera: Camera): void {
        p.push();
        p.translate(-camera.x, -camera.y);
        p.translate(300, 0);
        p.image(gTexture(SpaceShipImage), 0, 0, 32, 64);
        p.pop();
    }
}
