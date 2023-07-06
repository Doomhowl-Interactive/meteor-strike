import Camera from "../objects/Camera";

export default interface Drawable {
    draw(camera: Camera): void;
}
