import type { p5 } from "p5-svelte";
import { Vector2, RenderStyle } from "$lib/structures";

// Settings
const SIZE = 20;

const vectors: Vector2[] = [new Vector2(1, 1)];

let cellSize: [number, number];

export function setup(p5: p5, parent: HTMLDivElement) {
    p5.createCanvas(parent.clientWidth, parent.clientHeight);

    cellSize = [p5.width / SIZE, p5.height / SIZE];
}

export function draw(p5: p5) {
    p5.background(0);
    drawGrid(p5);
    drawVectors(p5);
}

function drawGrid(p5: p5) {
    p5.push();
    p5.stroke(255, 100);
    p5.line(0, p5.height / 2, p5.width, p5.height / 2);
    p5.line(p5.width / 2, 0, p5.width / 2, p5.height);

    for (let i = 1; i < SIZE; i++) {
        p5.line(
            cellSize[0] * i,
            p5.height / 2 - 10,
            cellSize[0] * i,
            p5.height / 2 + 10,
        );
        p5.line(
            p5.width / 2 - 10,
            cellSize[1] * i,
            p5.width / 2 + 10,
            cellSize[1] * i,
        );
    }

    p5.pop();
}

function drawVectors(p5: p5) {
    const size = 150 / SIZE;

    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.stroke(255);
    p5.strokeWeight(2);

    for (const vector of vectors) {
        const x = vector.x * cellSize[0];
        const y = -vector.y * cellSize[1];

        if (vector.style === RenderStyle.ARROW) {
            p5.line(0, 0, x, y);
            p5.push();
            const angle = p5.atan2(-y, -x);
            p5.translate(x, y);
            p5.rotate(angle - p5.HALF_PI);
            p5.triangle(-size * 0.6, size * 1.5, size * 0.6, size * 1.5, 0, 0);
            p5.pop();
        } else {
            p5.circle(x, y, size);
        }
    }

    p5.pop();
}

export function mouseClicked(event?: object) {

}
