import { p } from "./main";

export interface PointInterface {
    x: number;
    y: number;
}
export class Point implements PointInterface {
    x: number;
    y: number;

    constructor(point: PointInterface) {
        this.x = point.x;
        this.y = point.y;
    }

    *[Symbol.iterator](): Iterator<number> {
        yield this.x;
        yield this.y;
    }
}
