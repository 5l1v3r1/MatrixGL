var sphere = null;
var currentAnimation = null;
var currentRotation = mat4.create();
mat4.identity(currentRotation);

function initShapes() {
    sphere = new Sphere(1);
    sphere.getBuffer(gl);
    sphere.getColorBuffer(gl);
    sphere.getNormalsBuffer(gl);
}

function startAnimating() {
    inputPressed();
    drawScene();
}

function animateToMatrix(matrix) {
    var cur = currentAnimation ? currentAnimation.next() : null;
    if (!cur) {
        cur = mat4.create();
        mat4.identity(cur);
    }
    currentAnimation = new Animation(30, cur, matrix);
}

function setCurrentRotation(rot) {
    currentRotation = rot;
}

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);
    
    mvPushMatrix();
    
    mat4.translate(mvMatrix, [0, 0, -8]);
    mat4.multiply(mvMatrix, currentRotation);
    
    if (currentAnimation) {
        var matrix = currentAnimation.next();
        var dest = mat4.create();
        mat4.multiply(mvMatrix, matrix, dest);
        mat4.set(dest, mvMatrix);
    }
    
    
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.getBuffer());
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, sphere.getBuffer().itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.getColorBuffer());
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, sphere.getColorBuffer().itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere.getNormalsBuffer());
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, sphere.getNormalsBuffer().itemSize, gl.FLOAT, false, 0, 0);

    gl.uniform3f(shaderProgram.ambientColorUniform, 0.5, 0.5, 0.5);
    gl.uniform3fv(shaderProgram.lightingDirectionUniform, [0.5773502692, 0.5773502692, 0.5773502692]);
    gl.uniform3f(shaderProgram.directionalColorUniform, 0.8, 0.8, 0.8);

    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, sphere.getBuffer().numItems);

    mvPopMatrix();
    
    setTimeout(drawScene, 1000/30);
}
