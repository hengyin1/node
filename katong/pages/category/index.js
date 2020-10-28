var t = getApp();

Page({
    data: {
        searchColor: "rgba(0,0,0,0.4)",
        searchSize: "15",
        searchName: "搜索商品",
        scrollHeight: 0,
        curIndex: -1,
        curCateId: 0,
        categoryList: [],
        goodsList: [],
        noMore: !1,
        isLoading: !0,
        page: 1
    },
    onLoad: function() {
        var t = this;
        t.setListHeight(), t.getCategoryList();
    },
    onShow: function() {},
    setListHeight: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    scrollHeight: a.windowHeight - 47
                });
            }
        });
    },
    getCategoryList: function() {
        var a = this;
        t._get("category/index", {}, function(t) {
            var o = t.data;
            a.setData({
                categoryList: o.categoryList,
                goodsList: o.goodsList
            });
        });
    },
    getGoodsList: function(a, o) {
        var e = this;
        t._get("goods/lists", {
            page: o || 1,
            category_id: e.data.curCateId
        }, function(t) {
            var o = t.data.list, s = e.data.goodsList;
            1 == a ? e.setData({
                "goodsList.data": s.data.concat(o.data),
                isLoading: !1
            }) : e.setData({
                goodsList: o,
                isLoading: !1
            });
        });
    },
    onTargetGoods: function(t) {
        wx.navigateTo({
            url: "../goods/index?goods_id=" + t.detail.target.dataset.id
        });
    },
    onSelectNav: function(t) {
        var a = this, o = t.currentTarget.dataset.index;
        a.setData({
            curIndex: o,
            curCateId: o > -1 ? a.data.categoryList[o].category_id : 0,
            goodsList: [],
            page: 1,
            noMore: !1,
            isLoading: !0
        }), a.getGoodsList();
    },
    onDownLoad: function() {
        var t = this;
        if (t.data.page >= t.data.goodsList.last_page) return t.setData({
            noMore: !0
        }), !1;
        t.getGoodsList(!0, ++t.data.page);
    },
    onShareAppMessage: function() {
        return {
            title: "全部商品",
            path: "/pages/category/index"
        };
    }
});