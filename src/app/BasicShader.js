class BasicShader {
    constructor(canvas) {
        var vertCode = 'attribute vec3 position;' +
            'uniform mat4 Pmatrix;' +
            'uniform mat4 Vmatrix;' +
            'uniform mat4 Mmatrix;' +
            'attribute vec3 color;' +
            'varying vec3 vColor;' +
            'void main(void) { ' +
            'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);' +
            'vColor = color;' +
            '}';

        var fragCode = 'precision mediump float;' +
            'varying vec3 vColor;' +
            'void main(void) {' +
            'gl_FragColor = vec4(vColor, 1.);' +
            '}';

        this.gl = canvas.getContext('experimental-webgl');
        var vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertShader, vertCode);
        this.gl.compileShader(vertShader);

        var fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragShader, fragCode);
        this.gl.compileShader(fragShader);

        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vertShader);
        this.gl.attachShader(this.program, fragShader);
        this.gl.linkProgram(this.program);

        this._Pmatrix = this.gl.getUniformLocation(this.program, "Pmatrix");
        this._Vmatrix = this.gl.getUniformLocation(this.program, "Vmatrix");
        this._Mmatrix = this.gl.getUniformLocation(this.program, "Mmatrix");
        this._position = this.gl.getAttribLocation(this.program, "position");
        this._color = this.gl.getAttribLocation(this.program, "color");

    }

    associateVertices(actors) {

        // Create and store data into vertex buffer
        this.vertex_buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertex_buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(actors.mesh.vertices), this.gl.STATIC_DRAW);

        // Create and store data into color buffer
        this.color_buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.color_buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(actors.colors), this.gl.STATIC_DRAW);

        // Create and store data into index buffer
        this.index_buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(actors.mesh.indices), this.gl.STATIC_DRAW);


        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertex_buffer);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.index_buffer);
        this.gl.vertexAttribPointer(this._position, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this._position);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.color_buffer);
        this.gl.vertexAttribPointer(this._color, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this._color);
        this.gl.useProgram(this.program);

        this.totalIndexLength = actors.mesh.indices.length;
    }

    draw(camera, theme) {
        this.gl.enable(this.gl.DEPTH_TEST);

        this.gl.clearColor(...theme.background.v);
        //this.gl.clearColor(0.5, 0.5, 0.5, 0.9);
        this.gl.clearDepth(1.0);
        this.gl.viewport(0.0, 0.0, camera.width, camera.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.gl.uniformMatrix4fv(this._Pmatrix, false, camera.proj_matrix);
        this.gl.uniformMatrix4fv(this._Vmatrix, false, camera.view_matrix);
        this.gl.uniformMatrix4fv(this._Mmatrix, false, camera.mo_matrix);


        this.gl.drawElements(this.gl.TRIANGLES, this.totalIndexLength, this.gl.UNSIGNED_SHORT, 0);
    }
}