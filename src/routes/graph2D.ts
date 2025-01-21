import type { p5 } from "p5-svelte";
import Sketch from "$lib/sketch";
import LocalStorage from "$lib/data";
import { Vector2 } from "$lib/structures";

export interface Graph2DData {
    size: number;
    gridLines: "hidden" | "minimal" | "full";
    vectors: {[name: string]: [number, number]};
}

export default class Graph2D extends Sketch {
    data: Graph2DData;
    cellSize!: [number, number];

    constructor(p5: p5, w: number, h: number, data: Graph2DData) {
        super(p5, w, h);
        this.data = data;
    }

    setup() {
        const canvas = this.p5.createCanvas(this.w, this.h);
        canvas.mouseClicked((event) => this.mouseClicked(event));

        this.cellSize = [this.p5.width / this.data.size, this.p5.height / this.data.size];
    }

    draw() {
        this.p5.background(0);
        if (this.data.gridLines !== "hidden") this.drawGrid();
        this.drawVectors();
    }

    getVectorsArray(): Vector2[] {
        return Object.values(this.data.vectors).map((value) => new Vector2(...value));
    }

    drawGrid() {
        const isFull = this.data.gridLines === "full";

        this.p5.push();
        this.p5.stroke(245, 51, 82, 100);
        this.p5.line(0, this.p5.height / 2, this.p5.width, this.p5.height / 2);
        this.p5.stroke(135, 214, 2, 100);
        this.p5.line(this.p5.width / 2, 0, this.p5.width / 2, this.p5.height);
        this.p5.stroke(255, 20);

        for (let i = 1; i < this.data.size; i++) {
            this.p5.line(
                this.cellSize[0] * i,
                isFull ? 0 : this.p5.height / 2 - 10,
                this.cellSize[0] * i,
                isFull ? this.p5.height : this.p5.height / 2 + 10,
            );
            this.p5.line(
                isFull ? 0 : this.p5.width / 2 - 10,
                this.cellSize[1] * i,
                isFull ? this.p5.width : this.p5.width / 2 + 10,
                this.cellSize[1] * i,
            );
        }

        this.p5.pop();
    }

    drawVectors() {
        const size = 150 / this.data.size;

        for (const vector of this.getVectorsArray()) {
            vector.draw(this.p5, size, this.cellSize[0], this.cellSize[1]);
        }
    }

    mouseClicked(event: PointerEvent) {
        const offsetX = this.p5.map(event.offsetX, 0, this.p5.width, -this.p5.width / 2, this.p5.width / 2);
        const offsetY = this.p5.map(event.offsetY, 0, this.p5.height, this.p5.height / 2, -this.p5.height / 2);
        const x = offsetX / this.cellSize[0];
        const y = offsetY / this.cellSize[1];

        this.data.vectors[`${x}, ${y}`] = [x, y];
        LocalStorage.setGraph2DData(this.data);
    }
}
