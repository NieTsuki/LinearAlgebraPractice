export enum RenderStyle {
    ARROW,
    POINT,
}

export class Vector2 {
    x: number;
    y: number;
    style: RenderStyle;

    constructor(x: number, y: number, style: RenderStyle = RenderStyle.ARROW) {
        this.x = x;
        this.y = y;
        this.style = style;
    }
}

export class Vector3 extends Vector2 {
    z: number;

    constructor(x: number, y: number, z: number, style: RenderStyle = RenderStyle.ARROW) {
        super(x, y, style);
        this.z = z;
    }
}
