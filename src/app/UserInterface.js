class UserInterface {
    constructor(canvas) {
        this.canvas = canvas;
        this.AMORTIZATION = 0.95;
        this.drag = false;
        this.dX = 0;
        this.dY = 0;
        this.THETA = 0,
        this.PHI = 0;

        var old_x, old_y;

        var mouseDown = function (e) {
            this.drag = true;
            old_x = e.pageX, old_y = e.pageY;
            e.preventDefault();
            return false;
        };

        var mouseUp = function (e) {
            this.drag = false;
        };

        var mouseMove = function (e) {
            if (!this.drag) return false;
            this.dX = (e.pageX - old_x) * 2 * Math.PI / this.canvas.width;
            this.dY = (e.pageY - old_y) * 2 * Math.PI / this.canvas.height;
            this.THETA += this.dX;
            this.PHI += this.dY;
            old_x = e.pageX;
            old_y = e.pageY;
            e.preventDefault();
        };

        this.canvas.addEventListener("mousedown", mouseDown.bind(this), false);
        this.canvas.addEventListener("mouseup", mouseUp.bind(this), false);
        this.canvas.addEventListener("mouseout", mouseUp.bind(this), false);
        this.canvas.addEventListener("mousemove", mouseMove.bind(this), false);
    }

    applySlowDown() {
        if (!this.drag) {
            this.dX *= this.AMORTIZATION;
            this.dY *= this.AMORTIZATION;
            this.THETA += this.dX;
            this.PHI += this.dY;
        }
    }
}