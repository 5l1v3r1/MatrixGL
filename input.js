function inputPressed() {
    var matrixValues = [];
    for (var i = 0; i < 16; i++) {
        var name = '#matinput-' + i;
        var value = $(name).val();
        matrixValues[i] = parseFloat(value);
    }
    animateToMatrix(matrixValues);
}

function resetPressed() {
    mat4.identity(currentTransformation);
}

function mouseDragged(start, startRot, e) {
    var distance = Math.sqrt(Math.pow(e.offsetX - start.offsetX, 2) +
                             Math.pow(e.offsetY - start.offsetY, 2));
    var angle = distance / 100;
    var vector = [e.offsetY - start.offsetY, e.offsetX - start.offsetX, 0];
    vector[0] /= distance;
    vector[1] /= distance;
    var newRotation = mat4.create();
    mat4.identity(newRotation);
    mat4.rotate(newRotation, angle, vector);
    mat4.multiply(newRotation, startRot);
    currentTransformation = newRotation;
}

$(function() {
    var isClicked = false;
    var start = null;
    var startRot = mat4.create();
    $('#canvas').mousedown(function(e) {
        isClicked = true;
        start = e;
        mat4.set(currentTransformation, startRot);
    }).mouseup(function(e) {
        isClicked = false;
    }).mousemove(function(e) {
        if (isClicked) mouseDragged(start, startRot, e);
    }).on('DOMMouseScroll mousewheel', function(e) {
        e.preventDefault();
        currentTranslation[2] += e.originalEvent.wheelDelta / 120;
    });
    $('#model').change(function() {
        var name = $('#model').val();
        var instance = eval('new ' + name + '()'); // hackety hack
        loadModel(instance);
    });
});
