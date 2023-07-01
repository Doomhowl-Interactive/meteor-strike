import { p } from "./main";

import p5 from "p5";

const _images = new Map<string, p5.Image>();
export default function gTexture(img: string) {
    if (_images.has(img)) {
        return _images.get(img)!;
    }
    const loaded = p.loadImage(img);
    _images.set(img, loaded);
    return loaded;
}