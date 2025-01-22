import Sketch from "$lib/sketch";
import LocalStorage from "$lib/data";
import { Vector3 } from "$lib/structures";

export interface Graph3DData {
    size: number;
    gridLines: "hidden" | "minimal" | "full";
    vectorStyle: "arrow" | "point";
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

        this._handleGestures(canvas.elt);
    }

    draw() {
        this.cellSize = [
            this.p5.width / this.data.size,
            this.p5.height / this.data.size,
            this.p5.width / this.data.size,
        ];

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
        const scaleX = this.cellSize[0];
        const scaleY = this.cellSize[1];
        const scaleZ = this.cellSize[2];

        this.p5.normalMaterial();

        for (const vector of this.getVectorsArray()) {
            const x = vector.x * scaleX;
            const y = -vector.y * scaleY;
            const z = vector.z * scaleZ;
            const mag = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
            const rotZ = Math.atan2(x, -y);
            const rotX = Math.atan2(-z, Math.sqrt(x ** 2 + y ** 2));

            if (this.data.vectorStyle === "arrow") {
                this.p5.rotateZ(rotZ);
                this.p5.rotateX(rotX);
                this.p5.translate(0, -mag / 2, 0);
                this.p5.cylinder(size, mag);

                this.p5.translate(0, -mag / 2 + size, 0);
                this.p5.rotateX(this.p5.PI);
                this.p5.cone(size * 3, size * 6);
            } else {
                this.p5.translate(x, y, z);
                this.p5.sphere(size * 2);
            }
        }
    }
}
