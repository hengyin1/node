var e = getApp();

Page({
    data: {
        isLogin: !1,
        userInfo: {},
        orderCount: {}
    },
    onLoad: function(e) {},
    onShow: function() {
        var t = this;
        t.setData({
            isLogin: e.checkIsLogin()
        }), t.data.isLogin && t.getUserDetail();
    },
    getUserDetail: function() {
        var t = this;
        e._get("user.index/detail", {}, function(e) {
            t.setData(e.data);
        });
    },
    onTargetOrder: function(e) {
        if (!this.onCheckLogin()) return !1;
        var t = {
            all: "/pages/order/index?type=all",
            payment: "/pages/order/index?type=payment",
            delivery: "/pages/order/index?type=delivery",
            received: "/pages/order/index?type=received"
        };
        wx.navigateTo({
            url: t[e.currentTarget.dataset.type]
        });
    },
    onTargetMenus: function(e) {
        if (!this.onCheckLogin()) return !1;
        wx.navigateTo({
            url: "/" + e.currentTarget.dataset.url
        });
    },
    onLogin: function() {
        wx.navigateTo({
            url: "../login/login"
        });
    },
    onCheckLogin: function() {
        return !!this.data.isLogin || (e.showError("很抱歉，您还没有登录"), !1);
    }
});