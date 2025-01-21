import type { p5 } from "p5-svelte";
import Sketch from "$lib/sketch";
import { Vector2, VectorDrawStyle } from "$lib/structures";

export interface Graph2DData {
    size: number;
    vectors: {[name: string]: Vector2};
}

export default class Graph2D extends Sketch {
    data: Graph2DData;
    cellSize!: [number, number];

    constructor(p5: p5, parent: HTMLDivElement, data: Graph2DData) {
        super(p5, parent);
        this.data = data;
    }

    setup() {
        const canvas = this.p5.createCanvas(this.parent.clientWidth, this.parent.clientHeight);
        canvas.mouseClicked((event) => this.mouseClicked(event));

        this.cellSize = [this.p5.width / this.data.size, this.p5.height / this.data.size];
    }

    draw() {
        this.p5.background(0);
        this.drawGrid();
        this.drawVectors();
    }

    getVectorsArray(): Vector2[] {
        return Object.values(this.data.vectors);
    }

    drawGrid() {
        this.p5.push();
        this.p5.stroke(255, 100);
        this.p5.line(0, this.p5.height / 2, this.p5.width, this.p5.height / 2);
        this.p5.line(this.p5.width / 2, 0, this.p5.width / 2, this.p5.height);

        for (let i = 1; i < this.data.size; i++) {
            this.p5.line(
                this.cellSize[0] * i,
                this.p5.height / 2 - 10,
                this.cellSize[0] * i,
                this.p5.height / 2 + 10,
            );
            this.p5.line(
                this.p5.width / 2 - 10,
                this.cellSize[1] * i,
                this.p5.width / 2 + 10,
                this.cellSize[1] * i,
            );
        }

        this.p5.pop();
    }

    drawVectors() {
        const size = 150 / this.data.size;

        this.p5.push();
        this.p5.translate(this.p5.width / 2, this.p5.height / 2);
        this.p5.stroke(255);
        this.p5.strokeWeight(2);

        for (const vector of this.getVectorsArray()) {
            const x = vector.x * this.cellSize[0];
            const y = -vector.y * this.cellSize[1];

            if (vector.style === VectorDrawStyle.ARROW) {
                this.p5.line(0, 0, x, y);
                this.p5.push();
                const angle = this.p5.atan2(-y, -x);
                this.p5.translate(x, y);
                this.p5.rotate(angle - this.p5.HALF_PI);
                this.p5.triangle(-size * 0.6, size * 1.5, size * 0.6, size * 1.5, 0, 0);
                this.p5.pop();
            } else {
                this.p5.circle(x, y, size);
            }
        }

        this.p5.pop();
    }

    mouseClicked(event: PointerEvent) {
        const offsetX = this.p5.map(event.offsetX, 0, this.p5.width, -this.p5.width / 2, this.p5.width / 2);
        const offsetY = this.p5.map(event.offsetY, 0, this.p5.height, this.p5.height / 2, -this.p5.height / 2);
        const x = offsetX / this.cellSize[0];
        const y = offsetY / this.cellSize[1];
        this.data.vectors[`${x}, ${y}`] = new Vector2(x, y);
    }
}
