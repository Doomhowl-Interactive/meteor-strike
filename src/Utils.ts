import * as p5 from "p5";
import { p } from "./main";

const _rng = Array.from({ length: 1000 }, () => Math.random());
export function rng(i: number) {
    return _rng[Math.abs(Math.floor(i)) % _rng.length];
}

export function unblurCanvas() {
    const ctx = document.querySelector("canvas")!.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    (ctx as any).style = "image-rendering: pixelated";
}

const _images = new Map<string, p5.Image>();
export function gTexture(img: string, format: string = "png") {
    if (_images.has(img)) {
        return _images.get(img)!;
    }
    const loaded = p.loadImage(`content/${img}.${format}`);
    _images.set(img, loaded);
    return loaded;
}
