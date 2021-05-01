class ActorCollection {
    constructor() {

        this.entities = [];

    }

    push(actor) {
        this.entities.push(actor);
    }

    compile() {

        this.mesh = {};
        this.mesh.vertices = [];
        this.mesh.indices = [];
        this.colors = [];

        let vk = 0;
        let ik = 0;
        let ck = 0;

        for (let i = 0; i < this.entities.length; i++) {
            let offset = this.mesh.vertices.length / 3;
            let e = this.entities[i];

            for (let j = 0; j < e.mesh.vertices.length; j++) {
                this.mesh.vertices[vk++] = e.mesh.vertices[j] * e.scale + e.position[j % 3];
            }

            for (let j = 0; j < e.mesh.indices.length; j++) {
                this.mesh.indices[ik++] = e.mesh.indices[j] + offset;
            }

            for (let j = 0; j < e.colors.length; j++) {
                this.colors[ck++] = e.colors[j];
            }
        }

    }

    buildTestScene_atoms(sdf) {
        this.entities = [];
        this.entities.push(new A_Molecule(sdf));
        this.compile();
    }

    buildTestScene_spring() {
        let mesh = new Primative_Icosphere(2);
        let material = new Material([1, 0, 0]);
        this.entities.push(new Actor(mesh, material, [0, 0, 0], 1));
    }
}