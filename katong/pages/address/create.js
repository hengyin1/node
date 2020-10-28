var a = getApp();

Page({
    data: {
        disabled: !1,
        nav_select: !1,
        name: "",
        region: "",
        phone: "",
        detail: "",
        error: ""
    },
    onLoad: function(a) {},
    saveData: function(t) {
        var e = this, r = t.detail.value;
        if (r.region = e.data.region, !e.validation(r)) return a.showError(e.data.error), 
        !1;
        e.setData({
            disabled: !0
        }), a._post_form("address/add", r, function(t) {
            a.showSuccess(t.msg, function() {
                wx.navigateBack();
            });
        }, !1, function() {
            e.setData({
                disabled: !1
            });
        });
    },
    validation: function(a) {
        return "" === a.name ? (this.data.error = "收件人不能为空", !1) : a.phone.length < 1 ? (this.data.error = "手机号不能为空", 
        !1) : /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/.test(a.phone) ? this.data.region ? "" !== a.detail || (this.data.error = "详细地址不能为空", 
        !1) : (this.data.error = "省市区不能空", !1) : (this.data.error = "手机号不符合要求", !1);
    },
    bindRegionChange: function(a) {
        this.setData({
            region: a.detail.value
        });
    }
});