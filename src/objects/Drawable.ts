import { Camera } from "../types";

export interface Drawable {
    draw(camera: Camera): void;
}