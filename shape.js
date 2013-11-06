/**
 * A Shape instance represents vertex data
 * for a sphere approximation.
 */

function Shape() {
    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.buffer = null;
    this.colorBuffer = null;
    this.normalsBuffer = null;
}

Shape.prototype.getBuffer = function(theGl) {
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

Shape.prototype.getColorBuffer = function(theGl) {
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

Shape.prototype.getNormalsBuffer = function(theGl) {
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

