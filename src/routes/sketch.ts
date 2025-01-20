import type { p5 } from "p5-svelte";

const SIZE = 10;

let cellSize: [number, number];

export function setup(p5: p5, parent: HTMLDivElement) {
    p5.createCanvas(parent.clientWidth, parent.clientHeight);
    p5.background(0);

    cellSize = [p5.width / SIZE, p5.height / SIZE];
}

export function draw(p5: p5) {
    drawGrid(p5);
}

function drawGrid(p5: p5) {
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
}

export function mouseClicked(event?: object) {

}
