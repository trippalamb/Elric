class Actor {
    constructor(mesh, material, position=[0,0,0], scale=1) {
        this.mesh = mesh;
        this.material = material;
        this.position = position;
        this.scale = scale;

        this.colors = [];
        for (let i = 0; i < this.mesh.length; i++) {
            this.colors.push(...this.material.baseColor);
        }
    }

}