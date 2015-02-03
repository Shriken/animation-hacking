// canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.strokeStyle = "rgb(0,0,0)";
ctx.fillStyle = "rgb(0,0,0)";

var SEG_THICKNESS = 20;
var ROT_SPEED = 0.01;

var rot = 0;

var render = function(rot) {
	ctx.clearRect(-canvas.width / 2, -canvas.height / 2,
	               canvas.width, canvas.height);

	for (var h = 1; h <= 8; h++) {
		for (var i = 0; i < 3; i++) {
			drawSegment(i, h, rot);
		}
	}
};

var drawSegment = function(i, h, rot) {
	var theta = rot * h + i * Math.PI * 2 / 3;
	var x = Math.cos(theta) * h * SEG_THICKNESS;
	var y = Math.sin(theta) * h * SEG_THICKNESS;
	ctx.fillRect(x - 5, y - 5, 10, 10);
};

var tick = function() {
	render(rot);
	rot += ROT_SPEED;
	setTimeout(tick, 20);
}

tick();
