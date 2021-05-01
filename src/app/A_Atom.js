class AtomType {
    constructor(name, symbol, number, vdwRadius, color) {
        this.name = name;
        this.symbol = symbol;
        this.number = number;
        this.vdwRadius = vdwRadius;
        this.color = color;
    }
}

let AtomTypes = {
    Hydrogen: new AtomType(
        "Hydrogen",
        "H",
        1,
        1.2,
        [1,1,1]
    ),
    Carbon: new AtomType(
        "Carbon",
        "C",
        6,
        1.7,
        [0, 0, 0]
    ),
    Nitrogen: new AtomType(
        "Nitrogen",
        "N",
        7,
        1.55,
        [0, 0, 1]
    ),
    Oxygen: new AtomType(
        "Oxygen",
        "O",
        8,
        1.52,
        [1, 0, 0]
    )
}

let Symbol2Name = {
    H: "Hydrogen",
    C: "Carbon",
    N: "Nitrogen",
    O: "Oxygen"
}

class A_Atom extends Actor {
    constructor(type = AtomTypes.Hydrogen, origin = [0,0,0]) {

        let mesh = new Primative_Icosphere(4);
        let material = new Material(type.color);
        super(mesh, material, origin, type.vdwRadius);

    }
}
