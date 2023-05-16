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

    drawLayer(layer: TerrainLayer) {
        push();
        translate(
            -cameraX * layer.parallax,
            -cameraY - layer.yOffset * layer.parallax
        );
        fill(layer.col);
        beginShape();
        vertex(0, height);
        const count = 30;
        for (let x = 0; x <= count; x++) {
            vertex(x * layer.spacing, this.graph(layer, x));
        }
        vertex(count * layer.spacing, height);
        endShape(CLOSE);
        pop();
    }

    draw(): void {
        for (const layer of this.layers) {
            this.drawLayer(layer);
        }
    }
}

function createTerrain() {
    return new Terrain([
        {
            col: color(85, 79, 87),
            yOffset: 80,
            yScale: 30,
            parallax: 0.4,
            spacing: 20,
        },
        {
            col: color(180),
            yOffset: -20,
            yScale: 30,
            parallax: 0.6,
            spacing: 30,
        },
    ]);
}
