// canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.strokeStyle = "rgb(0,0,0)";
ctx.fillStyle = "rgb(0,0,0)";

var OFFSET_CONST = 2;
var LOOP_LENGTH = 400;
var NUM_CUBES = 28;
var ISO_FACTOR = 0.705;
var FUDGE_FACTOR = 0.83;
var ANGLE_FACTOR = 0.00025;
var cubes = [];

// set up cubes
for (var i = 1; i <= NUM_CUBES; i++) {
	cubes.push([i * 5, 0]);
}

// tick
var tick = function(t) {
	var tickHelper = function() {
		ctx.clearRect(-canvas.width / 2, -canvas.height / 2,
		              canvas.width, canvas.height);
		//ctx.fillRect(-10, -10, 20, 20);

		// update
		/*
		for (var i = 0; i < cubes.length; i++) {
			var cube = cubes[i];

			var angle = (t - cube[0] * OFFSET_CONST) % LOOP_LENGTH;
			angle /= LOOP_LENGTH; // normalize to [0, 1)
			if (angle > 0.25) angle = 0.25; // stall animation when it ends
			angle = (angle * 4 - 0.5) * Math.PI; // renormalize to [0, 1)
			angle = Math.PI / 2 * Math.sin(angle);

			cube[1] = angle;
		}
		*/
		for (var i = 0; i < cubes.length; i++) {
			cubes[i][1] += cubes[i][0] * ANGLE_FACTOR;
		}

		// render
		for (var i = 0; i < cubes.length; i++) {
			drawCube(cubes[i]);
		}

		setTimeout(tick(t+1), 10);
	}

	return tickHelper;
}

var drawCube = function(cube) {
	var theta = -(cube[1] + Math.PI / 4);
	var points = [];
	points.push([-cube[0], -cube[0], -cube[0]]);
	points.push([cube[0],  -cube[0], -cube[0]]);
	points.push([cube[0],  -cube[0],  cube[0]]);
	points.push([-cube[0], -cube[0],  cube[0]]);

	// rotate point by cube rot angle
	for (var i = 0; i < points.length; i++) {
		var newPoint = [];
		newPoint.push(points[i][0] * Math.cos(theta) -
		              points[i][2] * Math.sin(theta));
		newPoint.push(points[i][1]);
		newPoint.push(points[i][0] * Math.sin(theta) +
		              points[i][2] * Math.cos(theta));
		points[i] = newPoint;
	}

	// draw top
	ctx.beginPath();
	ctx.moveTo(points[0][0], (points[0][1] + points[0][2] * ISO_FACTOR) * FUDGE_FACTOR);
	ctx.lineTo(points[1][0], (points[1][1] + points[1][2] * ISO_FACTOR) * FUDGE_FACTOR);
	ctx.lineTo(points[2][0], (points[2][1] + points[2][2] * ISO_FACTOR) * FUDGE_FACTOR);
	ctx.lineTo(points[3][0], (points[3][1] + points[3][2] * ISO_FACTOR) * FUDGE_FACTOR);
	ctx.lineTo(points[0][0], (points[0][1] + points[0][2] * ISO_FACTOR) * FUDGE_FACTOR);
	ctx.stroke();

	// draw bottom
	ctx.beginPath();
	ctx.moveTo(points[0][0], -(points[0][1] + points[0][2] * ISO_FACTOR) * FUDGE_FACTOR);
	ctx.lineTo(points[1][0], -(points[1][1] + points[1][2] * ISO_FACTOR) * FUDGE_FACTOR);
	ctx.lineTo(points[2][0], -(points[2][1] + points[2][2] * ISO_FACTOR) * FUDGE_FACTOR);
	ctx.lineTo(points[3][0], -(points[3][1] + points[3][2] * ISO_FACTOR) * FUDGE_FACTOR);
	ctx.lineTo(points[0][0], -(points[0][1] + points[0][2] * ISO_FACTOR) * FUDGE_FACTOR);
	ctx.stroke();

	// draw sides
	for (var i = 0; i < 4; i++) {
		ctx.beginPath();
		ctx.moveTo(points[i][0],  (points[i][1] + points[i][2] * ISO_FACTOR) * FUDGE_FACTOR);
		ctx.lineTo(points[i][0], -(points[i][1] + points[i][2] * ISO_FACTOR) * FUDGE_FACTOR);
		ctx.stroke();
	}
}

tick(LOOP_LENGTH)();


function r() {
	window.location.reload();
}
