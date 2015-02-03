// canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.strokeStyle = "rgb(0,0,0)";
ctx.fillStyle = "rgb(0,0,0)";
ctx.save();

var SEG_THICKNESS = 30;
var ROT_SPEED = 0.01;

var rot = 0;

var renderClear = function() {
	ctx.restore();
	ctx.clearRect(-canvas.width / 2, -canvas.height / 2,
	              canvas.width, canvas.height);
};

var render = function(rot) {
	for (var i = 0; i < 3; i++) {
		drawArm(rot);
		ctx.rotate(Math.PI * 2 / 3);
	}
};

var drawArm = function(rot) {
	ctx.save();
	for (var i = 0; i < 8; i++) {
		ctx.rotate(rot);
		ctx.translate(SEG_THICKNESS, 0);
		drawSegment();
	}
	ctx.restore();
};

var drawSegment = function() {
	var x = SEG_THICKNESS;
	ctx.fillRect(x - 5, -5, 10, 10);
};

var tick = function() {
	renderClear();
	render(rot);
	render(-rot);
	rot += ROT_SPEED;
	setTimeout(tick, 20);
}

tick();
