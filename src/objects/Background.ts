import * as p5 from "p5";
import { p } from "../main";
import { Camera } from "../types";
import { rng } from "../utils";
import { Drawable } from "./Drawable";

interface TerrainLayer {
    yOffset: number;
    yScale: number;
    parallax: number;
    spacing: number;
    col: p5.Color;
}

class Terrain implements Drawable {
    constructor(public layers: TerrainLayer[]) {}

    graph(layer: TerrainLayer, i: number) {
        const index = Math.abs(Math.floor(i));
        return rng(index) * layer.yScale;
    }

    drawLayer(camera: Camera, layer: TerrainLayer) {
        p.push();
        p.translate(
            -camera.x * layer.parallax,
            -camera.y - layer.yOffset * layer.parallax
        );
        p.fill(layer.col);
        p.beginShape();
        p.vertex(0, p.height);
        const count = 30;
        for (let x = 0; x <= count; x++) {
            p.vertex(x * layer.spacing, this.graph(layer, x));
        }
        p.vertex(count * layer.spacing, p.height);
        p.endShape(p.CLOSE);
        p.pop();
    }

    draw(camera: Camera): void {
        for (const layer of this.layers) {
            this.drawLayer(camera, layer);
        }
    }
}

export default function createTerrain() {
    return new Terrain([
        {
            col: p.color(85, 79, 87),
            yOffset: 80,
            yScale: 30,
            parallax: 0.4,
            spacing: 20,
        },
        {
            col: p.color(180),
            yOffset: -20,
            yScale: 30,
            parallax: 0.6,
            spacing: 30,
        },
    ]);
}
