import { p } from "./main";
import * as p5 from "p5";

const _rng = Array.from({ length: 1000 }, () => Math.random());
export function rng(i: number) {
    return _rng[Math.abs(Math.floor(i)) % _rng.length];
}

export function disableNavigation() {
    document.addEventListener("keydown", (e) => {
        if (!["F12", "F5", "F11", "r"].includes(e.key)) {
            e.preventDefault();
        }
    });
}

export function unblurCanvas() {
    const ctx = document.querySelector("canvas")?.getContext("2d");
    if (!ctx) {
        throw new Error("Canvas not found");
    }

    ctx.imageSmoothingEnabled = false;
    (ctx as any).style = "image-rendering: pixelated";
}
