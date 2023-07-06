import { p } from "../main";
import { rng } from "../utils";

import * as p5 from "p5";
import Drawable from "./Drawable";

interface TerrainLayer {
    yOffset: number;
    yScale: number;
    spacing: number;
    col: p5.Color;
}

class Terrain implements Drawable {
    constructor(public layers: TerrainLayer[]) {}

    graph(layer: TerrainLayer, i: number) {
        const index = Math.abs(Math.floor(i));
        return rng(index) * layer.yScale;
    }

    drawLayer(layer: TerrainLayer, depth: number = 0) {
        const count = 30;
        const width = count * layer.spacing;
        p.push();
        p.translate(-width / 2, layer.yOffset, -depth);
        p.fill(layer.col);
        p.beginShape();
        p.vertex(0, p.height);
        for (let x = 0; x <= count; x++) {
            p.vertex(x * layer.spacing, this.graph(layer, x));
        }
        p.vertex(count * layer.spacing, p.height);
        p.endShape(p.CLOSE);
        p.pop();
    }

    draw(): void {
        this.layers.forEach((layer, i) => {
            this.drawLayer(layer, i);
        });
    }
}

export default function createTerrain() {
    return new Terrain([
        {
            col: p.color(85, 79, 87),
            yOffset: 80,
            yScale: 30,
            spacing: 20,
        },
        {
            col: p.color(180),
            yOffset: -20,
            yScale: 30,
            spacing: 30,
        },
    ]);
}
