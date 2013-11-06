/**
 * A Sphere instance represents vertex data
 * for a sphere approximation.
 */

function Sphere(_r, _step) {
    var step = _step || 10;
    var r = _r || 1;
    Shape.call(this);

    this.r = r;
    this.step = step;
    
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

Sphere.prototype = Object.create(Shape.prototype);

Sphere.point = function(i, j) {
    var y = Math.sin(i);
    var x = Math.cos(i) * Math.cos(j);
    var z = Math.cos(i) * Math.sin(j);
    return [x, y, z];
}

Sphere.scale = function(val, point) {
    return [point[0] * val, point[1] * val, point[2] * val];
}
