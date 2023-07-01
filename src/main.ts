import { Drawable } from "./objects/Drawable";
import { Camera } from "./types";
import { unblurCanvas } from "./utils";

import p5 from "p5";

import Robot from "./objects/Robot";
import Rocket from "./objects/Rocket";
import createTerrain from "./objects/Background";
import Crystal from "./objects/Crystals";
import AsteroidHolder from "./objects/Asteroids";

export const WIDTH = 320;
export const HEIGHT = 180;

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
        p.createCanvas(WIDTH, HEIGHT);
        p.frameRate(60);
        unblurCanvas();

        world = [
            createTerrain(),
            new Rocket(),
            new Robot(),
            new Crystal(370, 50, 0),
            new Crystal(420, 70, 1),
            new AsteroidHolder(80, 600),
        ];
    };

    p.draw = () => {
        p.background(11);
        p.noStroke();
        world.forEach((obj) => obj.draw(camera));
    };
};

export const p: p5 = new p5(sketch, document.body);
