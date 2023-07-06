import { p } from "@/main";

import gTexture from "@/assets";
import Drawable from "./Drawable";
import SpaceShipImage from "@assets/spaceship2.png";

export default class Rocket implements Drawable {
    draw(): void {
        p.push();
        p.translate(300, 0);
        p.image(gTexture(SpaceShipImage), 0, 0, 32, 64);
        p.pop();
    }
}
