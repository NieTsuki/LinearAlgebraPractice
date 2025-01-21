import type { p5 } from "p5-svelte";
import Sketch from "$lib/sketch";
import { Vector3 } from "$lib/structures";

export interface Graph3DData {
    size: number;
    vectors: {[name: string]: Vector3};
    rotate: {
        x: number;
        y: number;
        z: number;
    };
}

export default class Graph3D extends Sketch {
    data: Graph3DData;
    cellSize!: [number, number, number];

    constructor(p5: p5, parent: HTMLDivElement, data: Graph3DData) {
        super(p5, parent);
        this.data = data;
    }

    setup() {
        this.p5.createCanvas(this.parent.clientWidth, this.parent.clientHeight, this.p5.WEBGL);

        this.cellSize = [
            this.p5.width / this.data.size,
            this.p5.height / this.data.size,
            this.p5.width / this.data.size,
        ];
    }

    draw() {
        this.p5.background(0);
        this.p5.rotateX(this.p5.radians(this.data.rotate.x));
        this.p5.rotateY(this.p5.radians(this.data.rotate.y));
        this.p5.rotateZ(this.p5.radians(this.data.rotate.z));

        this.drawGrid();
        this.drawVectors();
    }

    getVectorsArray(): Vector3[] {
        return Object.values(this.data.vectors);
    }

    drawGrid() {
        this.p5.push();
        this.p5.stroke(255, 100);
        this.p5.line(-this.p5.width / 2, 0, this.p5.width / 2, 0);
        this.p5.line(0, -this.p5.height / 2, 0, this.p5.height / 2);
        this.p5.line(0, 0, this.p5.width / 2, 0, 0, -this.p5.width / 2);
        this.p5.translate(-this.p5.width / 2, -this.p5.height / 2, -this.p5.width / 2);

        for (let i = 1; i < this.data.size; i++) {
            // x-axis vertical
            this.p5.line(
                this.cellSize[0] * i,
                this.p5.height / 2 - 10,
                this.p5.width / 2,
                this.cellSize[0] * i,
                this.p5.height / 2 + 10,
                this.p5.width / 2,
            );

            // x-axis horizontal
            this.p5.line(
                this.cellSize[0] * i,
                this.p5.height / 2,
                this.p5.width / 2 - 10,
                this.cellSize[0] * i,
                this.p5.height / 2,
                this.p5.width / 2 + 10,
            );

            // y-axis x
            this.p5.line(
                this.p5.width / 2 - 10,
                this.cellSize[1] * i,
                this.p5.width / 2,
                this.p5.width / 2 + 10,
                this.cellSize[1] * i,
                this.p5.width / 2,
            );

            // y-axis z
            this.p5.line(
                this.p5.width / 2,
                this.cellSize[1] * i,
                this.p5.width / 2 - 10,
                this.p5.width / 2,
                this.cellSize[1] * i,
                this.p5.width / 2 + 10,
            );

            // z-axis vertical
            this.p5.line(
                this.p5.width / 2,
                this.p5.height / 2 - 10,
                this.cellSize[2] * i,
                this.p5.width / 2,
                this.p5.height / 2 + 10,
                this.cellSize[2] * i,
            );

            // z-axis horizontal
            this.p5.line(
                this.p5.width / 2 - 10,
                this.p5.height / 2,
                this.cellSize[2] * i,
                this.p5.width / 2 + 10,
                this.p5.height / 2,
                this.cellSize[2] * i,
            );
        }

        this.p5.pop();
    }

    drawVectors() {
        const size = 50 / this.data.size;

        for (const vector of this.getVectorsArray()) {
            vector.draw(this.p5, size, this.cellSize[0], this.cellSize[1], this.cellSize[2]);
        }
    }
}
