class Asteroid implements Drawable {
    constructor(public x: number, public y: number) {}

    draw(): void {}
}

class AsteroidHolder implements Drawable {
    timer: number;
    asteroids: Asteroid[];

    constructor(public leftBounds: number, public rightBounds: number) {
        this.timer = 0;
        this.asteroids = [];
    }

    update(): void {
        this.timer += delta();
        if (this.timer > 1) {
            this.timer = 0;
            this.spawnAsteroid();
        }
    }

    draw(): void {
        stroke(255, 0, 0);
        line(this.leftBounds, 0, this.leftBounds, height);
        line(this.rightBounds, 0, this.rightBounds, height);
        noStroke();
    }

    spawnAsteroid() {
        const x = random(this.leftBounds, this.rightBounds);
        const y = random(-200, -50);
        const a = new Asteroid(x, y);
        this.asteroids.push(a);
    }
}
