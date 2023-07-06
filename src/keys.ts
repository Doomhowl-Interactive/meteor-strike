import { p } from "./main";

export const PLAYER = {
    UP: ["UP_ARROW", "w"],
    DOWN: ["DOWN_ARROW", "s"],
    LEFT: ["LEFT_ARROW", "a"],
    RIGHT: ["RIGHT_ARROW", "d"],
};

export default function isKeyDown(keys: any): boolean {
    if (!Array.isArray(keys)) {
        keys = [keys];
    }

    return keys.some((k: string) => {
        if (k.length > 1) {
            return p.keyIsDown((p as any)[k]);
        }
        const code = k.toUpperCase().charCodeAt(0);
        return p.keyIsDown(code);
    });
}
