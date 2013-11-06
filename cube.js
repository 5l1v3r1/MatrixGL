/**
 * A Sphere instance represents vertex data
 * for a sphere approximation.
 */

function Cube(r) {
    Shape.call(this);

    this.r = r;
    
}

Sphere.prototype = Object.create(Shape);

Sphere.point = function(i, j) {
    var y = Math.sin(i);
    var x = Math.cos(i) * Math.cos(j);
    var z = Math.cos(i) * Math.sin(j);
    return [x, y, z];
}

Sphere.scale = function(val, point) {
    return [point[0] * val, point[1] * val, point[2] * val];
}
