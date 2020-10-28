Component({
    externalClasses: [ "page-class" ],
    properties: {
        openType: {
            type: String,
            value: ""
        },
        size: {
            type: String,
            value: "normal"
        }
    },
    methods: {
        tapButton: function() {
            this.triggerEvent("clickbutton");
        }
    }
});