import { disableNavigation, unblurCanvas } from "./utils";

import p5 from "p5";

import Player from "./objects/Player";
import Rocket from "./objects/Rocket";
import createTerrain from "./objects/Background";
import Crystal from "./objects/Crystals";
import AsteroidHolder from "./objects/Asteroids";
import CameraHolder from "./objects/CameraHolder";
import Drawable from "./objects/Drawable";
import Camera from "./objects/Camera";
import Gun from "./objects/Gun";

const camera = new Camera({
    x: 200,
    y: -55,
});

let world: Drawable[];

export function delta() {
    return p.deltaTime / 1000;
}

export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(320, 180);
        p.frameRate(60);
        unblurCanvas();
        disableNavigation();

        world = [
            createTerrain(),
            new CameraHolder(),
            new Rocket(),
            new Player(300, 90),
            new Gun(),
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
