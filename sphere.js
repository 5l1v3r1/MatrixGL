/**
 * A Sphere instance represents vertex data
 * for a sphere approximation.
 */

function Sphere(r, _step) {
    this.r = r;
    this.step = step;
    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.buffer = null;
    this.colorBuffer = null;
    this.normalsBuffer = null;
    
    var step = _step || 10;
    
    var angleStep = Math.PI / (2 * step);
    for (var i = -Math.PI / 2; i < Math.PI / 2; i += angleStep) {
        for (var j = 0; j < Math.PI * 2; j += angleStep) {
            var pointNorm = Sphere.point(i, j);
            var pointJNorm = Sphere.point(i, j + angleStep);
            var pointINorm = Sphere.point(i + angleStep, j);
            var pointFarNorm = Sphere.point(i + angleStep, j + angleStep, r);
            
            var point = Sphere.scale(r, pointNorm);
            var pointJ = Sphere.scale(r, pointJNorm);
            var pointI = Sphere.scale(r, pointINorm);
            var pointFar = Sphere.scale(r, pointFarNorm);
            
            var color = [Math.abs(Math.cos(j * 8))/2, Math.abs(Math.sin(i * 4)*Math.sin(j * 8)), Math.abs(Math.sin(j * 8)), 1];
            
            this.vertices = this.vertices.concat(point, pointJ, pointI, pointFar, pointI, pointJ);
            this.colors = this.colors.concat(color, color, color, color, color, color);
            this.normals = this.normals.concat(pointNorm, pointJNorm, pointINorm, pointFarNorm, pointINorm, pointJNorm);
        }
    }
}

Sphere.prototype.getVertices = function() {
    return this.vertices;
}

Sphere.prototype.getBuffer = function(theGl) {
    if (this.buffer != null) return this.buffer;
    // generate vertex buffer
    if (!theGl) throw new Error('Must pass GL on the first call');
    this.buffer = theGl.createBuffer();
    theGl.bindBuffer(theGl.ARRAY_BUFFER, this.buffer);
    theGl.bufferData(theGl.ARRAY_BUFFER, new Float32Array(this.vertices), theGl.STATIC_DRAW);
    this.buffer.itemSize = 3;
    this.buffer.numItems = this.vertices.length / 3;
    return this.buffer;
}

Sphere.prototype.getColorBuffer = function(theGl) {
    if (this.colorBuffer != null) return this.colorBuffer;
    // generate the color buffer
    if (!theGl) throw new Error('Must pass GL on the first call');
    this.colorBuffer = theGl.createBuffer();
    theGl.bindBuffer(theGl.ARRAY_BUFFER, this.colorBuffer);
    theGl.bufferData(theGl.ARRAY_BUFFER, new Float32Array(this.colors), theGl.STATIC_DRAW);
    this.colorBuffer.itemSize = 4;
    this.colorBuffer.numItems = this.colors.length / 4;
    return this.colorBuffer;
}

Sphere.prototype.getNormalsBuffer = function(theGl) {
    if (this.normalsBuffer != null) return this.normalsBuffer;
    // generate the color buffer
    if (!theGl) throw new Error('Must pass GL on the first call');
    this.normalsBuffer = theGl.createBuffer();
    theGl.bindBuffer(theGl.ARRAY_BUFFER, this.normalsBuffer);
    theGl.bufferData(theGl.ARRAY_BUFFER, new Float32Array(this.normals), theGl.STATIC_DRAW);
    this.normalsBuffer.itemSize = 3;
    this.normalsBuffer.numItems = this.normals.length / 3;
    return this.normalsBuffer;
}

Sphere.point = function(i, j) {
    var y = Math.sin(i);
    var x = Math.cos(i) * Math.cos(j);
    var z = Math.cos(i) * Math.sin(j);
    return [x, y, z];
}

Sphere.scale = function(val, point) {
    return [point[0] * val, point[1] * val, point[2] * val];
}
