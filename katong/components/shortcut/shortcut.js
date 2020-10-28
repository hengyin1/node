var t = getApp();

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        title: {
            type: String,
            value: "弹窗标题"
        }
    },
    data: {
        isShow: !1,
        transparent: !0
    },
    methods: {
        _onToggleShow: function(t) {
            this.setData({
                isShow: !this.data.isShow,
                transparent: !1
            });
        },
        _onTargetPage: function(a) {
            var e = t.getTabBarLinks();
            wx.switchTab({
                url: "/" + e[a.detail.target.dataset.index]
            });
        }
    }
});