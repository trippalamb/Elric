class A_Molecule {
    constructor(sdf) {
        this.sdf = sdf;
        this.entities = [];

        this.nAtoms = 0;
        this.nBonds = 0;
        this.position = [0, 0, 0];
        this.scale = 1;

        this.parseSDF(sdf);

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

    parseSDF(sdf) {

        this.entities = [];
        let i = 0;

        if (sdf !== "") {
            let lines = sdf.split("\n");
            this.nAtoms = parseInt(lines[3].substr(0, 3));
            this.nBonds = parseInt(lines[3].substr(3, 3));

            let l = 4;
            for (let j = 0; j < this.nAtoms; j++) {
                let pos = [];
                pos[0] = parseFloat(lines[l].substr(0, 10));
                pos[1] = parseFloat(lines[l].substr(10, 10));
                pos[2] = parseFloat(lines[l].substr(20, 10));
                let element = lines[l].substr(30, 2);
                l++;
                this.entities.push(new A_Atom(AtomTypes[Symbol2Name[element.trim()]], pos));
            }
        }
        else {
            this.entities[i++] = new A_Atom(AtomTypes.Hydrogen, [0.5120, 0.0000, -0.7760]);
            this.entities[i++] = new A_Atom(AtomTypes.Oxygen, [-0.0640, 0, 0]);
            this.entities[i++] = new A_Atom(AtomTypes.Hydrogen, [0.5120, 0.0000, 0.7760]);
        }
        this.compile();
    }
}