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

        p5.push();
        p5.stroke(255);
        p5.strokeWeight(2);
        p5.translate(p5.width / 2, p5.height / 2);

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

        p5.pop();
    }
}

export class Vector3 {
    x: number;
    y: number;
    z: number;
    style: VectorDrawStyle;

    constructor(x: number, y: number, z: number, style: VectorDrawStyle = VectorDrawStyle.ARROW) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.style = style;
    }

    draw(p5: p5, size: number, scaleX: number, scaleY: number, scaleZ: number) {
        const x = this.x * scaleX;
        const y = -this.y * scaleY;
        const z = this.z * scaleZ;
        const mag = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
        const rotZ = Math.atan2(x, -y);
        const rotX = Math.atan2(-z, Math.sqrt(x ** 2 + y ** 2));

        p5.normalMaterial();

        if (this.style === VectorDrawStyle.ARROW) {
            p5.rotateZ(rotZ);
            p5.rotateX(rotX);
            p5.translate(0, -mag / 2, 0);
            p5.cylinder(size, mag);

            p5.translate(0, -mag / 2 + size, 0);
            p5.rotateX(p5.PI);
            p5.cone(size * 3, size * 6);
        } else {
            p5.translate(x, y, z);
            p5.sphere(size * 2);
        }
    }
}
