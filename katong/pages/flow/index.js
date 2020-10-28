function t(t, o, a) {
    return o in t ? Object.defineProperty(t, o, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[o] = a, t;
}

var o = getApp();

Page({
    data: {
        goods_list: [],
        order_total_num: 0,
        order_total_price: 0
    },
    onLoad: function(t) {},
    onShow: function() {
        var t = this;
        t.setData({
            isLogin: o.checkIsLogin()
        }), t.data.isLogin && t.getCartList();
    },
    getCartList: function() {
        var t = this;
        o._get("cart/lists", {}, function(o) {
            t.setData(o.data);
        });
    },
    addCount: function(a) {
        var e = this, r = a.currentTarget.dataset.index, i = a.currentTarget.dataset.skuId, d = e.data.goods_list[r], n = e.data.order_total_price;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), o._post_form("cart/add", {
            goods_id: d.goods_id,
            goods_num: 1,
            goods_sku_id: i
        }, function() {
            var o;
            d.total_num++, e.setData((o = {}, t(o, "goods_list[" + r + "]", d), t(o, "order_total_price", e.mathadd(n, d.goods_price)), 
            o));
        });
    },
    minusCount: function(a) {
        var e = this, r = a.currentTarget.dataset.index, i = a.currentTarget.dataset.skuId, d = e.data.goods_list[r], n = e.data.order_total_price;
        d.total_num > 1 && (wx.showLoading({
            title: "加载中",
            mask: !0
        }), o._post_form("cart/sub", {
            goods_id: d.goods_id,
            goods_sku_id: i
        }, function() {
            var o;
            d.total_num--, d.total_num > 0 && e.setData((o = {}, t(o, "goods_list[" + r + "]", d), 
            t(o, "order_total_price", e.mathsub(n, d.goods_price)), o));
        }));
    },
    del: function(t) {
        var a = this, e = t.currentTarget.dataset.goodsId, r = t.currentTarget.dataset.skuId;
        wx.showModal({
            title: "提示",
            content: "您确定要移除当前商品吗?",
            success: function(t) {
                t.confirm && o._post_form("cart/delete", {
                    goods_id: e,
                    goods_sku_id: r
                }, function(t) {
                    a.getCartList();
                });
            }
        });
    },
    submit: function(t) {
        wx.navigateTo({
            url: "../flow/checkout?order_type=cart"
        });
    },
    mathadd: function(t, o) {
        return (Number(t) + Number(o)).toFixed(2);
    },
    mathsub: function(t, o) {
        return (Number(t) - Number(o)).toFixed(2);
    },
    goShopping: function() {
        wx.switchTab({
            url: "../index/index"
        });
    }
});