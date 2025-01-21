import type { p5 } from "p5-svelte";
import Sketch from "$lib/sketch";
import { Vector3 } from "$lib/structures";

export interface Graph3DData {
    size: number;
    vectors: {[name: string]: Vector3};
}

export default class Graph3D extends Sketch {
    data: Graph3DData;

    constructor(p5: p5, parent: HTMLDivElement, data: Graph3DData) {
        super(p5, parent);
        this.data = data;
    }

    setup() {
        this.p5.createCanvas(this.parent.clientWidth, this.parent.clientHeight, this.p5.WEBGL);
    }

    draw() {

    }
}
