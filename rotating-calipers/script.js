// canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.style.background = "white";
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.strokeStyle = "black";
ctx.fillStyle = "black";

var cos = Math.cos;
var sin = Math.sin;
var PI = Math.PI;

var CYCLE_LEN = 300;
var NUM_VERTS = 5;
var POLYGON_RAD = 200;
var polygon = [];
for (var i = 0; i < NUM_VERTS; i++) {
	var theta = 2 * Math.PI / NUM_VERTS * i;
	polygon.push([
		POLYGON_RAD * cos(theta),
		POLYGON_RAD * sin(theta)
	]);
};

ctx.rotate(-PI / 2);
var render = function(t) {
	ctx.clearRect(
		-canvas.width / 2,
		-canvas.height / 2,
		canvas.width,
		canvas.height
	);

	drawPolygon(polygon);
	drawCalipers(polygon);

	ctx.rotate(-2 * PI / CYCLE_LEN);
	rotate(polygon, 2 * PI / CYCLE_LEN);
};

var drawPolygon = function(polygon) {
	ctx.lineWidth = 4;

	var point = polygon[0];
	ctx.beginPath();
	ctx.moveTo(point[0], point[1]);
	for (var point of polygon) {
		ctx.lineTo(point[0], point[1]);
	}
	ctx.lineTo(polygon[0][0], polygon[0][1]);
	ctx.stroke();
};

var drawCalipers = function(polygon) {
	var minX = polygon[0][0];
	var maxX = polygon[0][0];
	for (var point of polygon) {
		if (point[0] < minX) minX = point[0];
		if (point[0] > maxX) maxX = point[0];
	}

	ctx.strokeWidth = 8;
	ctx.beginPath();
	ctx.moveTo(minX, +POLYGON_RAD);
	ctx.lineTo(minX, -POLYGON_RAD * 1.5);
	ctx.lineTo(maxX, -POLYGON_RAD * 1.5);
	ctx.lineTo(maxX, +POLYGON_RAD);
	ctx.stroke();
};

var rotate = function(points, theta) {
	points.forEach(function(point) {
		var px = point[0];
		var py = point[1];
		var newPx = px * cos(theta) - py * sin(theta);
		var newPy = px * sin(theta) + py * cos(theta);
		point[0] = newPx;
		point[1] = newPy;
	});
};

var tick = function(t) {
	return function() {
		render(t);
		setTimeout(tick((t + 1) % CYCLE_LEN), 20);
	}
};

tick(0)();
