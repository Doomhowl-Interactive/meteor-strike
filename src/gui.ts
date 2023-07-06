import Drawable from "./objects/Drawable";

export default class GUI implements Drawable {
    private readonly fields: Record<string, () => any> = {
        score: () => 0,
    };

    constructor() {
        const canvas = document.querySelector("canvas");
        canvas?.classList.add("overlay");
    }

    draw(): void {
        // TODO
    }
}
