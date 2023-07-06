import { p } from "../main";

import gTexture from "../assets";
import Camera from "../objects/Camera";
import Drawable from "./Drawable";

import BlueCrystalImage from "@assets/BlueCrystal.png";
import GreenCrystalImage from "@assets/GreenCrystal.png";
import WhiteCrystalImage from "@assets/WhiteCrystal.png";

export default class Crystal implements Drawable {
    constructor(public x: number, public y: number, public value: number) {}

    draw(camera: Camera): void {
        p.push();
        p.translate(-camera.x, -camera.y);
        p.translate(this.x, this.y);
        switch (this.value) {
            case 0:
                p.image(gTexture(BlueCrystalImage), 0, 0, 20, 20);
                break;
            case 1:
                p.image(gTexture(GreenCrystalImage), 0, 0, 20, 23);
                break;
            case 2:
                p.image(gTexture(WhiteCrystalImage), 0, 0, 20, 23);
                break;
            default:
                throw new Error("No crystal with value " + this.value);
        }
        p.pop();
    }
}
