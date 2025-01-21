import type { p5 } from "p5-svelte";

export default abstract class Sketch {
    p5: p5;
    w: number;
    h: number;

    constructor(p5: p5, w: number, h: number) {
        this.p5 = p5;
        this.w = w;
        this.h = h;

        p5.setup = () => this.setup();
        p5.draw = () => this.draw();
    }

    abstract setup(): void;
    abstract draw(): void;
}
