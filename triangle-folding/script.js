(function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var w = canvas.width;
	var h = canvas.height;
	ctx.translate(w / 2, h / 2);
	ctx.fillStyle = "rgb(0,0,0)";
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.save();

	var CYCLE_LEN = 30;
	var SIDE_LEN = 100;

	var drawTri = function(height, base) {
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(0, base);
		ctx.lineTo(height, base / 2);
		ctx.lineTo(0, 0);
		ctx.stroke();
	};

	var drawEquiTri = function(sideLen) {
		drawTri(-Math.sqrt(3) / 2 * sideLen, sideLen);
	};

	var drawFlippingTri = function(sideLen, t) {
		var theta = Math.PI * (t % CYCLE_LEN / CYCLE_LEN);
		drawTri(-Math.sqrt(3) / 2 * sideLen * Math.cos(theta), sideLen);
	};

	var tick = function(t) {
		return function() {
			ctx.clearRect(-w/2, -h/2, w, h);

			if (t % CYCLE_LEN == 0) {
				ctx.rotate(-2 * Math.PI / 6);
			}

			drawFlippingTri(SIDE_LEN, t);
			for (var i = 0; i < 4; i++) {
				drawEquiTri(SIDE_LEN);
				ctx.rotate(2 * Math.PI / 6);
			}
			drawFlippingTri(SIDE_LEN, t);
			ctx.rotate(2 * Math.PI / 3);

			ctx.restore();
			setTimeout(tick(t+1), 30);
		};
	};

	tick(0)();
})();
