class Engine{
    constructor(canvasID) {

        this.canvas = document.getElementById(canvasID);

        this.shader = new BasicShader(this.canvas);
        this.ui = new UserInterface(this.canvas);
        this.camera = new Camera(this.canvas);
        this.theme = Themes.Solarized_Dark;

        this.resizeCanvas();

        this.actors = new ActorCollection();
        this.actors.buildTestScene_atoms(document.getElementById("txt-sdf").value);
        //this.actors.buildTestScene_spring();
        this.actors.compile();

        this.shader.associateVertices(this.actors);

        this.animate();

        document.getElementById("btn-parseSDF").addEventListener("click", () => {
            this.actors.buildTestScene_atoms(document.getElementById("txt-sdf").value);
            this.shader.associateVertices(this.actors);
        });

        window.addEventListener('resize', this.resizeCanvas.bind(this));

        this.sdfFile = document.getElementById('file-sdf');
        this.sdfFile.addEventListener('change', this.loadMolecule.bind(this));
    }

    animate() {

        this.ui.applySlowDown();
        this.camera.move(this.ui.THETA, this.ui.PHI);
        this.shader.draw(this.camera, this.theme);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resizeCanvas() {
        if (this.canvas.width !== this.canvas.clientWidth ||
            this.canvas.height !== this.canvas.clientHeight) {

            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
            this.camera.updateViewport(this.canvas.width, this.canvas.height);
        }
    }

    loadMolecule() {
        const file = this.sdfFile.files[0];
        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            var ctx = this;
            reader.onload = function(e) {
                //console.log(e.target.result);
                ctx.actors.buildTestScene_atoms(e.target.result);
                ctx.shader.associateVertices(ctx.actors);
            }
            reader.onerror = function (e) {
                console.log("error reading file");
            }
        }
    }

}
