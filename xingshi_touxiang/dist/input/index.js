Component({
    behaviors: [ "wx://form-field" ],
    externalClasses: [ "i-class" ],
    properties: {
        title: {
            type: String
        },
        // text || textarea || password || number
        type: {
            type: String,
            value: "text"
        },
        disabled: {
            type: Boolean,
            value: false
        },
        placeholder: {
            type: String,
            value: ""
        },
        autofocus: {
            type: Boolean,
            value: false
        },
        mode: {
            type: String,
            value: "normal"
        },
        right: {
            type: Boolean,
            value: false
        },
        error: {
            type: Boolean,
            value: false
        },
        maxlength: {
            type: Number
        }
    },
    methods: {
        handleInputChange(event) {
            const {detail: detail = {}} = event;
            const {value: value = ""} = detail;
            this.setData({
                value: value
            });
            this.triggerEvent("change", event);
        },
        handleInputFocus(event) {
            this.triggerEvent("focus", event);
        },
        handleInputBlur(event) {
            this.triggerEvent("blur", event);
        }
    }
});