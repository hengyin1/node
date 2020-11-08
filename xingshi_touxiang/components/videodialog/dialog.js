// components/videodialog/dialog.js
Component({
    properties: {
        isShowVideoDialog: {
            type: Boolean,
            value: false
        },
        content: {
            type: String,
            value: ''
        },
        confirmText: {
            type: String,
            value: '确定'
        },
    },

    data: {
      
    },

    methods: {
        closeDialog: function () {
            this.setData({
                isShowVideoDialog: false
            });
        },
        viewVideo: function () {
            this.closeDialog();
            this.triggerEvent('viewVideo', {});
        },
    }
});