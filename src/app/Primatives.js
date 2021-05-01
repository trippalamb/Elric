class Primative_Icosphere{
    constructor(order = 0) {
        const f = (1 + 5 ** 0.5) / 2;

        this.vertices = [
            -1, f, 0, 1, f, 0, -1, -f, 0, 1, -f, 0,
            0, -1, f, 0, 1, f, 0, -1, -f, 0, 1, -f,
            f, 0, -1, f, 0, 1, -f, 0, -1, -f, 0, 1
        ];


        this.indices = [
            0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11,
            11, 10, 2, 5, 11, 4, 1, 5, 9, 7, 1, 8, 10, 7, 6,
            3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9,
            9, 8, 1, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7
        ];

        this.length = this.vertices.length / 3;

        this.midCache = order ? new Map() : null; // midpoint vertices cache to avoid duplicating shared vertices

        let trianglesPrev = [...this.indices];
        for (let i = 0; i < order; i++) {
            // subdivide each triangle into 4 triangles
            for (let k = 0; k < trianglesPrev.length; k += 3) {
                const v1 = trianglesPrev[k + 0];
                const v2 = trianglesPrev[k + 1];
                const v3 = trianglesPrev[k + 2];
                const a = this.addMidPoint(v1, v2);
                const b = this.addMidPoint(v2, v3);
                const c = this.addMidPoint(v3, v1);
                let t = k * 4;
                this.indices[t++] = v1; this.indices[t++] = a; this.indices[t++] = c;
                this.indices[t++] = v2; this.indices[t++] = b; this.indices[t++] = a;
                this.indices[t++] = v3; this.indices[t++] = c; this.indices[t++] = b;
                this.indices[t++] = a; this.indices[t++] = b; this.indices[t++] = c;
            }
            trianglesPrev = [...this.indices];
        }

        // normalize vertices
        for (let i = 0; i < this.vertices.length; i += 3) {
            const m = 1 / Math.hypot(this.vertices[i + 0], this.vertices[i + 1], this.vertices[i + 2]);
            this.vertices[i + 0] *= m;
            this.vertices[i + 1] *= m;
            this.vertices[i + 2] *= m;
        }

    }

    addMidPoint(a, b) {
        const key = Math.floor((a + b) * (a + b + 1) / 2) + Math.min(a, b); // Cantor's pairing function
        let i = this.midCache.get(key);
        if (i !== undefined) { this.midCache.delete(key); return i; }
        this.midCache.set(key, this.length);
        for (let k = 0; k < 3; k++) this.vertices[3 * this.length + k] = (this.vertices[3 * a + k] + this.vertices[3 * b + k]) / 2;
        i = this.length++;
        return i;
    }

}