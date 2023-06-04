import createTerrain from "./objects/Background";
import Crystal from "./objects/Crystals";
import { Drawable } from "./objects/Drawable";
import Robot from "./objects/Robot";
import Rocket from "./objects/Rocket";
import { Camera } from "./types";
import { unblurCanvas } from "./utils";
import * as p5 from "p5";

let camera: Camera = {
    x: 200,
    y: -55,
};

let world: Drawable[];

export function delta() {
    return p.deltaTime / 1000;
}

export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(320, 180);
        p.frameRate(60);
        unblurCanvas();

        world = [
            createTerrain(),
            new Rocket(),
            new Robot(),
            new Crystal(370, 50, 0),
            new Crystal(420, 70, 1),
        ];
    };

    p.draw = () => {
        p.background(11);
        p.noStroke();
        world.forEach((obj) => obj.draw(camera));
    }
};

export const p: p5 = new p5(sketch, document.body);