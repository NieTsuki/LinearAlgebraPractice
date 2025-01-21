import type { Graph2DData } from "../routes/graph2D";
import type { Graph3DData } from "../routes/graph3D";

export default class LocalStorage {
    static getGraph2DData(): Graph2DData {
        const saved = localStorage.getItem("graph2DData");

        if (saved === null) return {
            size: 20,
            gridLines: "full",
            vectors: {"a": [1, 1]},
        };

        return JSON.parse(saved);
    }

    static getGraph3DData(): Graph3DData {
        const saved = localStorage.getItem("graph3DData");

        if (saved === null) return {
            size: 20,
            gridLines: "full",
            vectors: {"a": [1, 1, 1]},
            rotate: {x: 0, y: 0, z: 0},
        };

        return JSON.parse(saved);
    }

    static setGraph2DData(data: Graph2DData | null) {
        localStorage.setItem("graph2DData", JSON.stringify(data));
    }

    static setGraph3DData(data: Graph3DData | null) {
        localStorage.setItem("graph3DData", JSON.stringify(data));
    }
}
