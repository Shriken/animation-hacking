// canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// aliases
var atan2 = Math.atan2;
var cos = Math.cos;
var sin = Math.sin;
var sqrt = Math.sqrt;
var PI = Math.PI;

// consts
var R = 300; // radius of sphere
var ER = 200;

// functions
var drawPt = function(p) {
    ctx.fillRect(canvas.width  / 2 + p[0] - 1,
                 canvas.height / 2 + p[1] - 1, 2, 2);
};

var drawLine = function(p1, p2) {
    ctx.beginPath();
    ctx.moveTo(canvas.width  / 2 + p1[0],
               canvas.height / 2 + p1[1]);
    ctx.lineTo(canvas.width  / 2 + p2[0],
               canvas.height / 2 + p2[1]);
    ctx.stroke();
};

var drawDisk = function(k, e) {
    for (var x = -R; x <= R; x++) {
        var p = [x, y(k, x), z(k, x)];
        var n = [x+1, y(k, x+1), z(k, x+1)];
        drawLine(project(p, e), project(n, e));
        
        p = [p[0], -p[1], -p[2]];
        n = [n[0], -n[1], -n[2]];
        drawLine(project(p, e), project(n, e));
    }
};

var y = function(k, x) {
    var r = sqrt(R*R - x*x);
    return r * sin(k * x);
};

var z = function(k, x) {
    var r = sqrt(R*R - x*x);
    return r * cos(k * x);
};

var project = function(p, e) {
    var t = atan2(e[2], e[0]);
    p = [cos(t) * p[0] - sin(t) * p[2], p[1],
         sin(t) * p[0] + cos(t) * p[2]];
    
    return p;
};

var tick = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    M += 0.01;
    
    var t = (PI * M) % (PI * 2);
    var e = [ER * cos(t), 0, ER * sin(t)];
    drawDisk(PI / R * 3 * (sin(M) + sin(2*M)), e);
    
    setTimeout(tick, 10);
};

// main
ctx.strokeStyle = "rgb(255,0,0)";
ctx.lineWidth = 3;
var M = 1;
tick();
