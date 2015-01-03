// canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.strokeStyle = "rgb(0,0,0)";
ctx.fillStyle = "rgb(0,0,0)";

var OFFSET_CONST = 1;
var LOOP_LENGTH = 400;
var NUM_CUBES = 28;
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
		for (var i = 0; i < cubes.length; i++) {
			var cube = cubes[i];

			var angle = (t - cube[0] * OFFSET_CONST) % LOOP_LENGTH;
			angle /= LOOP_LENGTH; // normalize to [0, 1)
			if (angle > 0.25) angle = 0.25; // stall animation when it ends
			angle = (angle * 4 - 0.5) * Math.PI; // renormalize to [0, 1)
			angle = Math.PI / 2 * Math.sin(angle);

			cube[1] = angle;
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
	ctx.rotate(cube[1]);

	ctx.beginPath();
	ctx.moveTo(-cube[0], 0);
	ctx.lineTo(cube[0], 0);
	ctx.stroke();

	ctx.rotate(-cube[1]);
}

tick(0)();


function r() {
	window.location.reload();
}
