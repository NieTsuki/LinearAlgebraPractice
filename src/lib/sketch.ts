import type { p5 } from "p5-svelte";

export default abstract class Sketch {
    p5: p5;
    parent: HTMLDivElement;

    constructor(p5: p5, parent: HTMLDivElement) {
        this.p5 = p5;
        this.parent = parent;

        p5.setup = () => this.setup();
        p5.draw = () => this.draw();
    }

    abstract setup(): void;
    abstract draw(): void;
}
