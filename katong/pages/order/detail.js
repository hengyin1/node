var r = getApp();

Page({
    data: {
        order_id: null,
        order: {}
    },
    onLoad: function(r) {
        this.data.order_id = r.order_id, this.getOrderDetail(r.order_id);
    },
    getOrderDetail: function(t) {
        var e = this;
        r._get("user.order/detail", {
            order_id: t
        }, function(r) {
            e.setData(r.data);
        });
    },
    goodsDetail: function(r) {
        var t = r.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../goods/index?goods_id=" + t
        });
    },
    cancelOrder: function(t) {
        var e = this.data.order_id;
        wx.showModal({
            title: "提示",
            content: "确认取消订单？",
            success: function(t) {
                t.confirm && r._post_form("user.order/cancel", {
                    order_id: e
                }, function(r) {
                    wx.navigateBack();
                });
            }
        });
    },
    payOrder: function(t) {
        var e = this, o = e.data.order_id;
        wx.showLoading({
            title: "正在处理..."
        }), r._post_form("user.order/pay", {
            order_id: o
        }, function(t) {
            if (-10 === t.code) return r.showError(t.msg), !1;
            wx.requestPayment({
                timeStamp: t.data.timeStamp,
                nonceStr: t.data.nonceStr,
                package: "prepay_id=" + t.data.prepay_id,
                signType: "MD5",
                paySign: t.data.paySign,
                success: function(r) {
                    e.getOrderDetail(o);
                },
                fail: function() {
                    r.showError("订单未支付");
                }
            });
        });
    },
    receipt: function(t) {
        var e = this, o = e.data.order_id;
        wx.showModal({
            title: "提示",
            content: "确认收到商品？",
            success: function(t) {
                t.confirm && r._post_form("user.order/receipt", {
                    order_id: o
                }, function(r) {
                    e.getOrderDetail(o);
                });
            }
        });
    }
});