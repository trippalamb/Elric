class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.v = [this.r, this.g, this.b, this.a];
    }
}

class Theme {
    constructor(name) {
        this.name = name;
        this["construct_" + this.name]();
    }

    construct_Default() {
        this.background = new Color(0.5, 0.5, 0.5, 0.9);
    }

    construct_Solarized_Dark() {
        this.background = new Color(7.0 / 255.0, 54.0 / 255.0, 66.0 / 255.0, 1.0);
    }
}

let Themes = {
    Default: new Theme("Default"),
    Solarized_Dark: new Theme("Solarized_Dark")
}