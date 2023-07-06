import { p } from "@/main";

import gTexture from "@/assets";
import Camera from "../objects/Camera";
import Drawable from "./Drawable";
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
