import Sketch from "$lib/sketch";
import LocalStorage from "$lib/data";
import { Vector3 } from "$lib/structures";

export interface Graph3DData {
    size: number;
    gridLines: "hidden" | "minimal" | "full";
    vectors: {[name: string]: [number, number, number]};
    rotate: {
        x: number;
        y: number;
        z: number;
    };
}

export default class Graph3D extends Sketch {
    data!: Graph3DData;
    cellSize!: [number, number, number];

    async _handleGestures(canvas: HTMLCanvasElement) {
        const hammerjs = await import("hammerjs");
        const hammer = new hammerjs.default(canvas);

        hammer.on("pan", (event: HammerInput) => {
            this.data.rotate.x -= event.velocityY;
            this.data.rotate.y += event.velocityX;
        });

        hammer.on("panend", () => {
            LocalStorage.setGraph3DData(this.data);
        });
    }

    setup() {
        this.data = LocalStorage.getGraph3DData();

        const canvas = this.p5.createCanvas(this.w, this.h, this.p5.WEBGL);

        this.cellSize = [
            this.p5.width / this.data.size,
            this.p5.height / this.data.size,
            this.p5.width / this.data.size,
        ];

        this._handleGestures(canvas.elt);
    }

    draw() {
        this.p5.background(0);
        this.p5.rotateX(this.p5.radians(this.data.rotate.x));
        this.p5.rotateY(this.p5.radians(this.data.rotate.y));
        this.p5.rotateZ(this.p5.radians(this.data.rotate.z));

        if (this.data.gridLines !== "hidden") this.drawGrid();
        this.drawVectors();
    }

    getVectorsArray(): Vector3[] {
        return Object.values(this.data.vectors).map((value) => new Vector3(...value));
    }

    drawGrid() {
        const isFull = this.data.gridLines === "full";

        this.p5.push();
        this.p5.stroke(245, 51, 82, 100);
        this.p5.line(-this.p5.width / 2, 0, this.p5.width / 2, 0);
        this.p5.stroke(135, 214, 2, 100);
        this.p5.line(0, -this.p5.height / 2, 0, this.p5.height / 2);
        this.p5.stroke(41, 140, 245, 100);
        this.p5.line(0, 0, this.p5.width / 2, 0, 0, -this.p5.width / 2);
        this.p5.translate(-this.p5.width / 2, -this.p5.height / 2, -this.p5.width / 2);
        this.p5.stroke(255, 20);

        for (let i = 1; i < this.data.size; i++) {
            // x-axis vertical
            this.p5.line(
                this.cellSize[0] * i,
                isFull ? 0 : this.p5.height / 2 - 10,
                this.p5.width / 2,
                this.cellSize[0] * i,
                isFull ? this.p5.height : this.p5.height / 2 + 10,
                this.p5.width / 2,
            );

            // x-axis horizontal
            this.p5.line(
                this.cellSize[0] * i,
                this.p5.height / 2,
                isFull ? this.p5.width : this.p5.width / 2 - 10,
                this.cellSize[0] * i,
                this.p5.height / 2,
                isFull ? 0 : this.p5.width / 2 + 10,
            );

            // y-axis x
            this.p5.line(
                isFull ? 0 : this.p5.width / 2 - 10,
                this.cellSize[1] * i,
                this.p5.width / 2,
                isFull ? this.p5.width : this.p5.width / 2 + 10,
                this.cellSize[1] * i,
                this.p5.width / 2,
            );

            // y-axis z
            this.p5.line(
                this.p5.width / 2,
                this.cellSize[1] * i,
                isFull ? this.p5.width : this.p5.width / 2 - 10,
                this.p5.width / 2,
                this.cellSize[1] * i,
                isFull ? 0 : this.p5.width / 2 + 10,
            );

            // z-axis vertical
            this.p5.line(
                this.p5.width / 2,
                isFull ? 0 : this.p5.height / 2 - 10,
                this.cellSize[2] * i,
                this.p5.width / 2,
                isFull ? this.p5.height : this.p5.height / 2 + 10,
                this.cellSize[2] * i,
            );

            // z-axis horizontal
            this.p5.line(
                isFull ? this.p5.width : this.p5.width / 2 - 10,
                this.p5.height / 2,
                this.cellSize[2] * i,
                isFull ? 0 : this.p5.width / 2 + 10,
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
