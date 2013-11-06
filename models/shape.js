/**
 * A Shape instance represents vertex data
 * for a sphere approximation.
 */

function Shape() {
    this.vertices = [];
    this.colors = [];
    this.normals = [];
    this.indices = null; // optional
    
    // buffers
    this.buffer = null;
    this.colorBuffer = null;
    this.normalsBuffer = null;
    this.indicesBuffer = null;
    this.normalsBuffer = null;
}

Shape.prototype.getBuffer = function(theGl) {
    if (this.buffer != null) return this.buffer;
    return this.createBufferAttr(theGl, 'buffer', this.vertices, 3);
}

Shape.prototype.getColorBuffer = function(theGl) {
    if (this.colorBuffer != null) return this.colorBuffer;
    return this.createBufferAttr(theGl, 'colorBuffer', this.colors, 4);
}

Shape.prototype.getNormalsBuffer = function(theGl) {
    if (this.normalsBuffer != null) return this.normalsBuffer;
    return this.createBufferAttr(theGl, 'normalsBuffer', this.normals, 3);
}

Shape.prototype.getIndicesBuffer = function(theGl) {
    if (!this.indices) return null;
    if (this.indicesBuffer != null) return this.indicesBuffer;
    return this.createBufferAttr(theGl, 'indicesBuffer', this.indices, 1,
                                 Uint16Array, theGl.ELEMENT_ARRAY_BUFFER);
}

Shape.prototype.drawingMethod = function(theGl) {
    return theGl.TRIANGLES;
}

Shape.prototype.createBufferAttr = function(theGl, attr, array, itemSize, _constructor, _buffer) {
    if (!theGl) throw new Error('Must pass GL on the first call');
    var constructor = _constructor || Float32Array;
    var buffer = _buffer || theGl.ARRAY_BUFFER;
    this[attr] = theGl.createBuffer();
    theGl.bindBuffer(buffer, this[attr]);
    theGl.bufferData(buffer, new constructor(array), theGl.STATIC_DRAW);
    this[attr].itemSize = itemSize;
    this[attr].numItems = array.length / itemSize;
    return this[attr];
}

