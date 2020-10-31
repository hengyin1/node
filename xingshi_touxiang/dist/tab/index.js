Component({
    externalClasses: [ "i-class" ],
    relations: {
        "../tabs/index": {
            type: "parent"
        }
    },
    properties: {
        key: {
            type: String,
            value: ""
        },
        title: {
            type: String,
            value: ""
        },
        dot: {
            type: Boolean,
            value: false
        },
        count: {
            type: Number,
            value: 0
        }
    },
    data: {
        current: false,
        currentColor: "",
        scroll: false
    },
    methods: {
        changeCurrent(current) {
            this.setData({
                current: current
            });
        },
        changeCurrentColor(currentColor) {
            this.setData({
                currentColor: currentColor
            });
        },
        changeScroll(scroll) {
            this.setData({
                scroll: scroll
            });
        },
        handleClickItem() {
            const parent = this.getRelationNodes("../tabs/index")[0];
            parent.emitEvent(this.data.key);
        }
    }
});