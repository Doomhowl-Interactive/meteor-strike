import { Point } from "../types";
import { Camera } from "./Camera";

export interface Drawable {
    draw(camera: Camera): void;
}
