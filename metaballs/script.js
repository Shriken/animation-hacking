var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    balls = [];

// initialize the balls
for (var i = 0; i < 36; i++) {
	balls.push([canvas.width  / 5.0 * (i % 6),
	            canvas.height / 5.0 * Math.floor(i / 6)]);
}

function getValAt(x, y) {
	var val = 0;
	for (var i = 0; i < balls.length; i++) {
		var dx = balls[i][0] - x;
		var dy = balls[i][1] - y;
		val += f(dx * dx + dy * dy);
	}

	return val;
}

function f(r2) {
	r2 /= 1000;
	if (r2 > 0.707*0.707) return 0;
	return r2*r2 - r2 + 0.25;
}

function draw() {
	for (var i = 0; i < canvas.height; i++) {
		for (var j = 0; j < canvas.width; j++) {
			var val = Math.floor(2000 * getValAt(j, i));
			val = val > 200 ? 255 : 0;
			ctx.fillStyle = 'rgb(' + val + ',' + val + ',' + val + ')';
			ctx.fillRect(j, i, 1, 1);
		}
	}
}

function updateBall() {
	balls[0][0] = event.offsetX;
	balls[0][1] = event.offsetY;
	draw();
}

function tick() {
	draw();
}

draw();
