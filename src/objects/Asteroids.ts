import { Camera } from "@/types";
import { delta, p } from "../main";
import { Drawable } from "./Drawable";

class Asteroid implements Drawable {
    constructor(public x: number, public y: number) {}

    draw(): void {}
}

export default class AsteroidHolder implements Drawable {
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

    draw(camera: Camera): void {
        p.push();
        p.stroke(255, 0, 0);
        p.translate(-camera.x, -camera.y);
        p.line(this.leftBounds, 0, this.leftBounds, p.height);
        p.line(this.rightBounds, 0, this.rightBounds, p.height);
        p.noStroke();
        p.pop();
    }

    spawnAsteroid() {
        const x = p.random(this.leftBounds, this.rightBounds);
        const y = p.random(-200, -50);
        const a = new Asteroid(x, y);
        this.asteroids.push(a);
    }
}
