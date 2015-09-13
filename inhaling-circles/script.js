var init = function() {
	var state = {
		running: true,
		canvas: document.getElementById('canvas'),
		ctx: canvas.getContext('2d'),
		rad: 300,
		offset: 100,
		numCircles: 10,
		cycle: 600,
		t: 0,
	};

	loop(state);
};

var loop = function(state) {
	if (!state.running) {
		return;
	}

	update(state);
	render(state);

	setTimeout(function() { loop(state); }, 30);
};

var update = function(state) {
	state.t++;
	while (state.t >= state.cycle) {
		state.t -= state.cycle;
	}
};

var render = function(state) {
	var ctx = state.ctx;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.save();
	ctx.translate(canvas.width / 2, canvas.height / 2);
	var fractionThrough = state.t / state.cycle * 2*Math.PI;
	var baseRad = state.rad * Math.sin(Math.sin(fractionThrough) * 2*Math.PI);

	ctx.lineWidth = 2;
	ctx.strokeStyle = "#fff";
	for (var i = 0; i < state.numCircles; i++) {
		var rad = Math.pow(
			baseRad * (i + 1) / state.numCircles,
			2
		) / state.rad;

		ctx.beginPath();
		ctx.arc(0, 0, rad, 0, 2 * Math.PI);
		ctx.stroke();
	}

	ctx.restore();
};

window.onload = init;
