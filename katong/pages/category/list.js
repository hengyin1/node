var t = getApp();

Page({
    data: {
        searchColor: "rgba(0,0,0,0.4)",
        searchSize: "15",
        searchName: "搜索商品",
        scrollHeight: null,
        showView: !1,
        arrange: "",
        sortType: "all",
        sortPrice: !1,
        option: {},
        list: {},
        noList: !0,
        no_more: !1,
        page: 1
    },
    onLoad: function(t) {
        var a = this;
        a.setListHeight(), a.setData({
            option: t
        }, function() {
            a.getGoodsList(!0);
        });
    },
    getGoodsList: function(a, e) {
        var s = this;
        t._get("goods/lists", {
            page: e || 1,
            sortType: s.data.sortType,
            sortPrice: s.data.sortPrice ? 1 : 0,
            category_id: s.data.option.category_id || 0,
            search: s.data.option.search || ""
        }, function(t) {
            var e = t.data.list, o = s.data.list;
            !0 === a || void 0 === o.data ? s.setData({
                list: e,
                noList: !1
            }) : s.setData({
                "list.data": o.data.concat(e.data)
            });
        });
    },
    setListHeight: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    scrollHeight: a.windowHeight - 90
                });
            }
        });
    },
    switchSortType: function(t) {
        var a = this, e = t.currentTarget.dataset.type, s = "price" !== e || !a.data.sortPrice;
        a.setData({
            list: {},
            page: 1,
            sortType: e,
            sortPrice: s
        }, function() {
            a.getGoodsList(!0);
        });
    },
    toSynthesize: function(t) {
        wx.navigateTo({
            url: "../category/screen?objectId="
        });
    },
    onChangeShowState: function() {
        var t = this;
        t.setData({
            showView: !t.data.showView,
            arrange: t.data.arrange ? "" : "arrange"
        });
    },
    bindDownLoad: function() {
        if (this.data.page >= this.data.list.last_page) return this.setData({
            no_more: !0
        }), !1;
        this.getGoodsList(!1, ++this.data.page);
    },
    onShareAppMessage: function() {
        return {
            title: "全部分类",
            desc: "",
            path: "/pages/category/index"
        };
    }
});