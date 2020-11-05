Component({
	props: {
		value: {
			type: String,
			default: ""
		},
		index: {
			type: Number,
			default: 0
		}
	},
	data: {
		hidden: !0
	},
	methods: {
		changeVal: function(e) {
			this.triggerEvent("change-val", {value: e.detail.value});
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
		add: function() {
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