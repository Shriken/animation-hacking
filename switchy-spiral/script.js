$(function() {
	var slider_data = [
		{
			controls: "SEG_THICKNESS",
			value: 30,
			min: 1,
			max: 100,
			step: 1
		},
		{
			controls: "SQUARE_RAD",
			value: 4,
			min: 1,
			max: 10,
			step: 0.1
		},
		{
			controls: "ROT_SPEED",
			value: 0.01,
			min: 0.001,
			max: 0.015,
			step: 0.0001
		},
		{
			controls: "NUM_ARMS",
			value: 8,
			min: 1,
			max: 32,
			step: 1
		}
	];
	var sliders = $(".slider");
	sliders.map(
		function(index) {
			var dat = slider_data[index];
			$(sliders[index]).slider({
				value: dat.value,
				min: dat.min,
				max: dat.max,
				step: dat.step,
				slide: function(event, ui) {
					setVar(dat.controls, ui.value);
				},
			});
		}
	);

	// canvas
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.save();

	var data = {
		SEG_THICKNESS: 30,
		SQUARE_RAD:    4,
		ROT_SPEED:     0.01,
		NUM_ARMS:      8,
	};

	var rot = 0;

	var renderClear = function() {
		ctx.restore();
		ctx.clearRect(-canvas.width / 2, -canvas.height / 2,
	              	  canvas.width, canvas.height);
	};

	var render = function(rot) {
		for (var i = 0; i < data.NUM_ARMS; i++) {
			drawArm(rot);
			ctx.rotate(Math.PI * 2 / data.NUM_ARMS);
		}
	};

	var drawArm = function(rot) {
		ctx.save();
		for (var i = 0; i < 8; i++) {
			ctx.rotate(rot);
			ctx.translate(data.SEG_THICKNESS, 0);
			drawSegment();
		}
		ctx.restore();
	};

	var drawSegment = function() {
		var x = data.SEG_THICKNESS;
		ctx.fillRect(x - data.SQUARE_RAD, -data.SQUARE_RAD,
	             	 2 * data.SQUARE_RAD, 2 * data.SQUARE_RAD);
	};

	var tick = function() {
		renderClear();
		render(rot);
		render(-rot);
		rot += data.ROT_SPEED;
		setTimeout(tick, 20);
	};

	var setVar = function(k, v) {
		data[k] = v;
	};

	tick();
});
