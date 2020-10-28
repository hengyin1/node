var t = getApp();

Page({
    data: {
        list: [],
        default_id: null
    },
    onLoad: function(t) {
        this.data.options = t;
    },
    onShow: function() {
        this.getAddressList();
    },
    getAddressList: function() {
        var e = this;
        t._get("address/lists", {}, function(t) {
            e.setData(t.data);
        });
    },
    createAddress: function() {
        wx.navigateTo({
            url: "./create"
        });
    },
    editAddress: function(t) {
        wx.navigateTo({
            url: "./detail?address_id=" + t.currentTarget.dataset.id
        });
    },
    removeAddress: function(e) {
        var s = this, a = e.currentTarget.dataset.id;
        wx.showModal({
            title: "提示",
            content: "您确定要移除当前收货地址吗?",
            success: function(e) {
                e.confirm && t._post_form("address/delete", {
                    address_id: a
                }, function(t) {
                    s.getAddressList();
                });
            }
        });
    },
    setDefault: function(e) {
        var s = this, a = e.detail.value;
        return s.setData({
            default_id: parseInt(a)
        }), t._post_form("address/setDefault", {
            address_id: a
        }, function(t) {
            "flow" === s.data.options.from && wx.navigateBack();
        }), !1;
    }
});