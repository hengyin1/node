const { windowWidth } = wx.getSystemInfoSync()

Component({
	properties: {

	},
	data: {
		canvas: {
			width: 0.9 * windowWidth,
			height: 0.09 * windowWidth
		}
	},
	ready: function () {
		this.initStage();
	},
	methods: {
		initStage: function() {
			const context = wx.createCanvasContext('colorpicker');
			context.drawImage('./static/color.jpg', 0, 0, this.data.canvas.width, this.data.canvas.height);
			context.draw();
		},
		touchmove: function(e) {
			const { x, y } = e.touches[0];
			if (x >= 0 && x <= this.data.canvas.width && y >= 0 && y <= this.data.canvas.height) {
				const [r, g, b] = this.data.ctx.getImageData(x, y, 1, 1).data;
				this.triggerEvent("touchmove", {
					r: r,
					g: g,
					b: b
				})
			}
		},
		touchend: function() {
			this.triggerEvent("touchend", {});
		}
	}
})