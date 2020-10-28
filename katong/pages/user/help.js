var t = getApp();

Page({
    data: {
        list: []
    },
    onLoad: function(t) {},
    onShow: function() {
        this.getHelpList();
    },
    getHelpList: function() {
        var a = this;
        t._get("wxapp/help", {}, function(t) {
            a.setData(t.data);
        });
    }
});