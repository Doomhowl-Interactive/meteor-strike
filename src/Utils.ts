const _rng = Array.from({ length: 1000 }, () => Math.random());
function rng(i: number) {
    return _rng[Math.abs(Math.floor(i)) % _rng.length];
}
function delta() {
    return deltaTime / 1000;
}

function unblurCanvas() {
    const ctx = document.querySelector("canvas").getContext("2d");
    ctx.imageSmoothingEnabled = false;
    (ctx as any).style = "image-rendering: pixelated";
}

const formats = ["png", "jpg", "jpeg", "gif", "webp", "bmp", "ico", "svg"];
const _images = new Map<string, p5.Image>();
function loadGImage(path: string) {
    let image = null;
    for (const format of formats) {
        if (image !== null) {
            break;
        }
        image = loadImage(
            path + "." + format,
            () => console.debug("Loaded image " + path),
            () => {}
        );
    }
    if (image === null) {
        throw new Error("Could not load image " + path);
    }
    return image;
}
function gTexture(img: string) {
    if (_images.has(img)) {
        return _images.get(img);
    }
    const loaded = loadGImage(`assets/${img}`);
    _images.set(img, loaded);
    return loaded;
}
