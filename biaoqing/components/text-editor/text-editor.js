Component({
	properties: {
		value: {
			type: String,
			value: ""
		},
		index: {
			type: Number,
			value: 0
		}
	},
	data: {
		hidden: !0
	},
	methods: {
		changeVal: function(e) {
			this.triggerEvent("changeVal", {value: e.detail.value});
		},
		toggle: function() {
			this.setData({
				hidden: !this.data.hidden
			})
		},
		touch: function(e) {
			this.triggerEvent("change-color", {value: e});
		},
		touchend: function() {
		},
		addtex: function() {
			this.triggerEvent("add", {});
		},
		del: function() {
			this.triggerEvent("del", {});
		},
		focus: function() {
		},
		blur: function() {
		}
	}
})