var o = getApp();

Page({
    data: {
        nav_select: !1,
        options: {},
        address: null,
        exist_address: !1,
        goods: {},
        disabled: !1,
        hasError: !1,
        error: ""
    },
    onLoad: function(o) {
        this.data.options = o, console.log(o);
    },
    onShow: function() {
        this.getOrderData();
    },
    getOrderData: function() {
        var r = this, t = r.data.options, e = function(t) {
            if (1 !== t.code) return o.showError(t.msg), !1;
            t.data.has_error ? (r.data.hasError = !0, r.data.error = t.data.error_msg, o.showError(r.data.error)) : (r.data.hasError = !1, 
            r.data.error = ""), r.setData(t.data);
        };
        "buyNow" === t.order_type ? o._get("order/buyNow", {
            goods_id: t.goods_id,
            goods_num: t.goods_num,
            goods_sku_id: t.goods_sku_id
        }, function(o) {
            e(o);
        }) : "cart" === t.order_type && o._get("order/cart", {}, function(o) {
            e(o);
        });
    },
    selectAddress: function() {
        wx.navigateTo({
            url: "../address/" + (this.data.exist_address ? "index?from=flow" : "create")
        });
    },
    submitOrder: function() {
        var r = this, t = r.data.options;
        if (r.data.disabled) return !1;
        if (r.data.hasError) return o.showError(r.data.error), !1;
        var e = function(r) {
            if (-10 === r.code) return o.showError(r.msg, function() {
                wx.redirectTo({
                    url: "../order/index?type=payment"
                });
            }), !1;
            wx.requestPayment({
                timeStamp: r.data.payment.timeStamp,
                nonceStr: r.data.payment.nonceStr,
                package: "prepay_id=" + r.data.payment.prepay_id,
                signType: "MD5",
                paySign: r.data.payment.paySign,
                success: function(o) {
                    wx.redirectTo({
                        url: "../order/detail?order_id=" + r.data.order_id
                    });
                },
                fail: function() {
                    o.showError("订单未支付", function() {
                        wx.redirectTo({
                            url: "../order/index?type=payment"
                        });
                    });
                }
            });
        };
        r.data.disabled = !0, wx.showLoading({
            title: "正在处理..."
        }), "buyNow" === t.order_type ? o._post_form("order/buyNow", {
            goods_id: t.goods_id,
            goods_num: t.goods_num,
            goods_sku_id: t.goods_sku_id
        }, function(o) {
            console.log("success"), e(o);
        }, function(o) {
            console.log("fail");
        }, function() {
            console.log("complete"), r.data.disabled = !1;
        }) : "cart" === t.order_type && o._post_form("order/cart", {}, function(o) {
            console.log("success"), e(o);
        }, function(o) {
            console.log("fail");
        }, function() {
            console.log("complete"), r.data.disabled = !1;
        });
    }
});