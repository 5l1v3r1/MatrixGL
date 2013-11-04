function Animation(steps, source, dest) {
    var step = [];
    for (var i = 0; i < source.length; i++) {
        step[i] = (dest[i] - source[i]) / steps;
    }
    this.step = step;
    this.cur = source;
    this.dest = dest;
    this.iter = 0;
    this.steps = steps;
}

Animation.prototype.isDone = function() {
    return this.iter >= this.steps;
}

Animation.prototype.next = function() {
    if (this.isDone()) return this.dest;
    for (var i = 0; i < this.step.length; i++) {
        this.cur[i] += this.step[i];
    }
    this.iter++;
    return this.cur;
}
