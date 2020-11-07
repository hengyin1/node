const { windowWidth } = wx.getSystemInfoSync()
let context

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
			const query = wx.createSelectorQuery().in(this);
			query.select('#colorpicker')
      .fields({ node: true })
      .exec(res => {
        const canvas = res[0].node;
				context = canvas.getContext('2d');
				
        canvas.width = this.data.canvas.width;
				canvas.height = this.data.canvas.height;

				const img = canvas.createImage();
				img.onload = () => {
					context.drawImage(img, 0, 0, this.data.canvas.width, this.data.canvas.height);
				}
				img.src = './static/color.jpg';
      })

			// const context = wx.createCanvasContext('colorpicker');
			// context.drawImage('./static/color.jpg', 0, 0, this.data.canvas.width, this.data.canvas.height);
			// context.draw();
		},
		touchstart: function(e) {
			this.touch(e);
		},
		touchmove: function(e) {
			this.touch(e);
		},
		touch: function (e) {
			const { x, y } = e.touches[0];
			if (x >= 0 && x <= this.data.canvas.width && y >= 0 && y <= this.data.canvas.height) {
				const [r, g, b] = context.getImageData(x, y, 1, 1).data;
				this.triggerEvent("touch", {
					r: r,
					g: g,
					b: b
				})
			}
		}
	}
})