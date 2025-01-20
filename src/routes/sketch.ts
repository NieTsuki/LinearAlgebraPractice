import type { p5 } from "p5-svelte";

export function setup(p5: p5, parent: HTMLDivElement) {
    p5.createCanvas(parent.clientWidth, parent.clientHeight);
    p5.background(0);
}

export function draw(p5: p5) {

}
