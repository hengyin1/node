var t = getApp();

Page({
    data: {
        dataType: "all",
        list: []
    },
    onLoad: function(t) {
        this.data.dataType = t.type || "all", this.setData({
            dataType: this.data.dataType
        });
    },
    onShow: function() {
        this.getOrderList(this.data.dataType);
    },
    getOrderList: function(a) {
        var e = this;
        t._get("user.order/lists", {
            dataType: a
        }, function(t) {
            e.setData(t.data), t.data.list.length && wx.pageScrollTo({
                scrollTop: 0
            });
        });
    },
    bindHeaderTap: function(t) {
        this.setData({
            dataType: t.target.dataset.type
        }), this.getOrderList(t.target.dataset.type);
    },
    cancelOrder: function(a) {
        var e = this, r = a.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "确认取消订单？",
            success: function(a) {
                a.confirm && t._post_form("user.order/cancel", {
                    order_id: r
                }, function(t) {
                    e.getOrderList(e.data.dataType);
                });
            }
        });
    },
    receipt: function(a) {
        var e = this, r = a.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "确认收到商品？",
            success: function(a) {
                a.confirm && t._post_form("user.order/receipt", {
                    order_id: r
                }, function(t) {
                    e.getOrderList(e.data.dataType);
                });
            }
        });
    },
    payOrder: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.showLoading({
            title: "正在处理..."
        }), t._post_form("user.order/pay", {
            order_id: e
        }, function(a) {
            if (-10 === a.code) return t.showError(a.msg), !1;
            wx.requestPayment({
                timeStamp: a.data.timeStamp,
                nonceStr: a.data.nonceStr,
                package: "prepay_id=" + a.data.prepay_id,
                signType: "MD5",
                paySign: a.data.paySign,
                success: function(t) {
                    wx.navigateTo({
                        url: "../order/detail?order_id=" + e
                    });
                },
                fail: function() {
                    t.showError("订单未支付");
                }
            });
        });
    },
    detail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../order/detail?order_id=" + a
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    }
});