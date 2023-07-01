import { p } from "./main";
import * as p5 from "p5";

const _rng = Array.from({ length: 1000 }, () => Math.random());
export function rng(i: number) {
    return _rng[Math.abs(Math.floor(i)) % _rng.length];
}

export function unblurCanvas() {
    const ctx = document.querySelector("canvas")!.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    (ctx as any).style = "image-rendering: pixelated";
}