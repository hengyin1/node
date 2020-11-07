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
		
	},
	methods: {
		changeVal: function(e) {
			this.triggerEvent("changeVal", {value: e.detail.value});
		},
		toggle: function() {
			this.triggerEvent("toggle", {});
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