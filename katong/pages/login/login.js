var n = getApp();

Page({
    data: {},
    onLoad: function(n) {},
    getUserInfo: function(a) {
        var t = this;
        n.getUserInfo(a, function() {
            t.onNavigateBack();
        });
    },
    onNotLogin: function() {
        this.onNavigateBack();
    },
    onNavigateBack: function() {
        wx.navigateBack();
    }
});