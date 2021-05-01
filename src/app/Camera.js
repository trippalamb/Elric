class Camera {
    constructor(canvas) {
        this.updateViewport(canvas.width, canvas.height);
        this.mo_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        this.view_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        this.view_matrix[14] = this.view_matrix[14] - 10;
    }

    move(THETA, PHI) {
        setToIndentity(this.mo_matrix);
        rotateY(this.mo_matrix, THETA);
        rotateX(this.mo_matrix, PHI);
    }

    updateViewport(w, h) {
        this.width = w;
        this.height = h;
        this.proj_matrix = get_projection(40, this.width / this.height, 1, 100);
    }
}

function get_projection(angle, a, zMin, zMax) {
    var ang = Math.tan((angle * .5) * Math.PI / 180);
    return [
        0.5 / ang, 0, 0, 0,
        0, 0.5 * a / ang, 0, 0,
        0, 0, -(zMax + zMin) / (zMax - zMin), -1,
        0, 0, (-2 * zMax * zMin) / (zMax - zMin), 0
    ];
}

function setToIndentity(a) {
    a[0] = 1, a[1] = 0, a[2] = 0, a[3] = 0;
    a[4] = 0, a[5] = 1, a[6] = 0, a[7] = 0;
    a[8] = 0, a[9] = 0, a[10] = 1, a[11] = 0;
    a[12] = 0, a[13] = 0, a[14] = 0, a[15] = 1;
}

function rotateX(m, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var mv1 = m[1], mv5 = m[5], mv9 = m[9];

    m[1] = m[1] * c - m[2] * s;
    m[5] = m[5] * c - m[6] * s;
    m[9] = m[9] * c - m[10] * s;

    m[2] = m[2] * c + mv1 * s;
    m[6] = m[6] * c + mv5 * s;
    m[10] = m[10] * c + mv9 * s;
}

function rotateY(m, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var mv0 = m[0], mv4 = m[4], mv8 = m[8];

    m[0] = c * m[0] + s * m[2];
    m[4] = c * m[4] + s * m[6];
    m[8] = c * m[8] + s * m[10];

    m[2] = c * m[2] - s * mv0;
    m[6] = c * m[6] - s * mv4;
    m[10] = c * m[10] - s * mv8;
}