abstract class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Vector2 extends Vector {

}

export class Vector3 extends Vector {
    z: number;

    constructor(x: number, y: number, z: number) {
        super(x, y);
        this.z = z;
    }
}
