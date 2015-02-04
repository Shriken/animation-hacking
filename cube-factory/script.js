// canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.style.background = "black";
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.lineWidth = 2;
ctx.strokeStyle = "white";
ctx.fillStyle = "white";

var cos = Math.cos;
var sin = Math.sin;

var RAD = 60;
var PI = Math.PI;

var render = function(t) {
	ctx.clearRect(-canvas.width / 2, -canvas.height / 2,
	              canvas.width, canvas.height);
	renderLines(t);
	renderCubes(t);
};

var renderLines = function(t) {
};

var renderCubes = function(t) {
	ctx.save();

	ctx.translate(0, 1.5 * RAD * (1 - cos(t)));

	drawCube();
	ctx.translate(0, RAD * 3);
	drawCube();
	ctx.translate(0, -RAD * 6);
	drawCube();
	ctx.translate(0, -RAD * 3);
	drawCube();

	ctx.restore();
};

var drawCube = function() {
	ctx.save()

	for (var i = 0; i < 6; i++) {
		drawTopFace();
		ctx.rotate(PI / 3);
	}

	ctx.restore();
};

var drawTopFace = function() {
	ctx.beginPath();
	ctx.moveTo(0, -RAD);
	ctx.lineTo(RAD * cos(PI / 6), -RAD * sin(PI / 6));
	ctx.lineTo(0, 0);
	ctx.lineTo(-RAD * cos(PI / 6), -RAD * sin(PI / 6));
	ctx.lineTo(0, -RAD);
	ctx.lineTo(RAD * cos(PI / 6), -RAD * sin(PI / 6));
	ctx.stroke();
};

var tick = function(t) {
	return function() {
		render(t);
		setTimeout(tick((t + 0.03) % Math.PI), 20);
	}
}
tick(0)();
