var model = null;
var currentAnimation = null;
var currentTransformation = mat4.create();
mat4.identity(currentTransformation);
var currentTranslation = [0, 0, -8];

function initShapes() {
    loadModel(new Sphere(1));
}

function loadModel(aModel) {
    model = aModel;
    model.getBuffer(gl);
    model.getColorBuffer(gl);
    model.getNormalsBuffer(gl);
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

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);
    
    mvPushMatrix();
    
    mat4.translate(mvMatrix, currentTranslation);
    mat4.multiply(mvMatrix, currentTransformation);
    
    if (currentAnimation) {
        var matrix = currentAnimation.next();
        var dest = mat4.create();
        mat4.multiply(mvMatrix, matrix, dest);
        mat4.set(dest, mvMatrix);
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, model.getBuffer());
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, model.getBuffer().itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, model.getColorBuffer());
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, model.getColorBuffer().itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, model.getNormalsBuffer());
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, model.getNormalsBuffer().itemSize, gl.FLOAT, false, 0, 0);

    var indices = model.getIndicesBuffer(gl);
    if (indices != null) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
    }

    gl.uniform3f(shaderProgram.ambientColorUniform, 0.5, 0.5, 0.5);
    gl.uniform3fv(shaderProgram.lightingDirectionUniform, [0.5773502692, 0.5773502692, 0.5773502692]);
    gl.uniform3f(shaderProgram.directionalColorUniform, 0.8, 0.8, 0.8);

    setMatrixUniforms();
    if (indices != null) {
        gl.drawElements(model.drawingMethod(gl), indices.numItems, gl.UNSIGNED_SHORT, 0);
    } else {
        gl.drawArrays(model.drawingMethod(gl), 0, model.getBuffer().numItems);
    }

    mvPopMatrix();
    
    setTimeout(drawScene, 1000/30);
}
