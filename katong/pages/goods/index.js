var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = getApp(), e = require("../../wxParse/wxParse.js");

Page({
    data: {
        nav_select: !1,
        indicatorDots: !0,
        autoplay: !0,
        interval: 3e3,
        duration: 800,
        currentIndex: 1,
        floorstatus: !1,
        showView: !0,
        detail: {},
        goods_price: 0,
        line_price: 0,
        stock_num: 0,
        goods_num: 1,
        goods_sku_id: 0,
        cart_total_num: 0,
        specData: {}
    },
    goods_spec_arr: [],
    onLoad: function(t) {
        var o = this;
        o.data.goods_id = t.goods_id, o.getGoodsDetail();
    },
    getGoodsDetail: function() {
        var t = this;
        o._get("goods/detail", {
            goods_id: t.data.goods_id
        }, function(o) {
            var e = t.initGoodsDetailData(o.data);
            t.setData(e);
        });
    },
    initGoodsDetailData: function(t) {
        var o = this;
        return t.detail.content.length > 0 && e.wxParse("content", "html", t.detail.content, o, 0), 
        t.goods_sku_id = t.detail.spec[0].spec_sku_id, t.goods_price = t.detail.spec[0].goods_price, 
        t.line_price = t.detail.spec[0].line_price, t.stock_num = t.detail.spec[0].stock_num, 
        20 == t.detail.spec_type && (t.specData = o.initManySpecData(t.specData)), t;
    },
    initManySpecData: function(t) {
        for (var o in t.spec_attr) for (var e in t.spec_attr[o].spec_items) e < 1 && (t.spec_attr[o].spec_items[0].checked = !0, 
        this.goods_spec_arr[o] = t.spec_attr[o].spec_items[0].item_id);
        return t;
    },
    modelTap: function(t) {
        var o = t.currentTarget.dataset.attrIdx, e = t.currentTarget.dataset.itemIdx, s = this.data.specData;
        for (var a in s.spec_attr) for (var i in s.spec_attr[a].spec_items) o == a && (s.spec_attr[a].spec_items[i].checked = !1, 
        e == i && (s.spec_attr[a].spec_items[e].checked = !0, this.goods_spec_arr[a] = s.spec_attr[a].spec_items[e].item_id));
        this.setData({
            specData: s
        }), this.updateSpecGoods();
    },
    updateSpecGoods: function() {
        var o = this.goods_spec_arr.join("_"), e = this.data.specData.spec_list.find(function(t) {
            return t.spec_sku_id == o;
        });
        "object" === (void 0 === e ? "undefined" : t(e)) && this.setData({
            goods_sku_id: e.spec_sku_id,
            goods_price: e.form.goods_price,
            line_price: e.form.line_price,
            stock_num: e.form.stock_num
        });
    },
    setCurrent: function(t) {
        this.setData({
            currentIndex: t.detail.current + 1
        });
    },
    onChangeShowState: function() {
        this.setData({
            showView: !this.data.showView
        });
    },
    goTop: function(t) {
        this.setData({
            scrollTop: 0
        });
    },
    scroll: function(t) {
        this.setData({
            floorstatus: t.detail.scrollTop > 200
        });
    },
    up: function() {
        this.setData({
            goods_num: ++this.data.goods_num
        });
    },
    down: function() {
        this.data.goods_num > 1 && this.setData({
            goods_num: --this.data.goods_num
        });
    },
    flowCart: function() {
        wx.switchTab({
            url: "../flow/index"
        });
    },
    submit: function(t) {
        var e = this, s = t.currentTarget.dataset.type;
        "buyNow" === s ? wx.navigateTo({
            url: "../flow/checkout?" + o.urlEncode({
                order_type: "buyNow",
                goods_id: e.data.goods_id,
                goods_num: e.data.goods_num,
                goods_sku_id: e.data.goods_sku_id
            })
        }) : "addCart" === s && o._post_form("cart/add", {
            goods_id: e.data.goods_id,
            goods_num: e.data.goods_num,
            goods_sku_id: e.data.goods_sku_id
        }, function(t) {
            o.showSuccess(t.msg), e.setData(t.data);
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return {
            title: t.data.detail.goods_name,
            path: "/pages/goods/index?goods_id=" + t.data.goods_id
        };
    }
});