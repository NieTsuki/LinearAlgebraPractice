import type { p5 } from "p5-svelte";

export enum VectorDrawStyle {
    ARROW,
    POINT,
}

export class Vector2 {
    x: number;
    y: number;
    style: VectorDrawStyle;

    constructor(x: number, y: number, style: VectorDrawStyle = VectorDrawStyle.ARROW) {
        this.x = x;
        this.y = y;
        this.style = style;
    }

    draw(p5: p5, size: number, scaleX: number, scaleY: number) {
        const x = this.x * scaleX;
        const y = -this.y * scaleY;

        if (this.style === VectorDrawStyle.ARROW) {
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
}

export class Vector3 extends Vector2 {
    z: number;

    constructor(x: number, y: number, z: number, style: VectorDrawStyle = VectorDrawStyle.ARROW) {
        super(x, y, style);
        this.z = z;
    }
}
