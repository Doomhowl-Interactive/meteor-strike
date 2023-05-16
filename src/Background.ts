interface TerrainLayer {
    yOffset: number;
    yScale: number;
    parallax: number;
    spacing: number;
    col: p5.Color;
}

function graphTerrainLayer(layer: TerrainLayer, i: number) {
    return rng(Math.abs(Math.floor(i))) * layer.yScale;
}

function drawTerrainLayer(layer: TerrainLayer) {
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
        vertex(x * layer.spacing, graphTerrainLayer(layer, x));
    }
    vertex(count * layer.spacing, height);
    endShape(CLOSE);
    pop();
}

function renderBackground() {
    const terrain: TerrainLayer[] = [
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
    ];
    for (const layer of terrain) {
        drawTerrainLayer(layer);
    }
}
