var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("siteinfo.js")), n = [ "pages/index/index", "pages/category/index", "pages/flow/index", "pages/user/index" ];

App({
    globalData: {
        user_id: null
    },
    api_root: "",
    onLaunch: function() {
        this.setApiRoot();
    },
    onShow: function(t) {},
    setApiRoot: function() {
        this.api_root = o.default.siteroot + "index.php?s=/api/";
    },
    getWxappBase: function(t) {
        this._get("wxapp/base", {}, function(o) {
            wx.setStorageSync("wxapp", o.data.wxapp), t && t(o.data.wxapp);
        }, !1, !1);
    },
    doLogin: function() {
        var t = getCurrentPages();
        if (t.length) {
            var o = t[t.length - 1];
            "pages/login/login" != o.route && wx.setStorageSync("currentPage", o);
        }
        wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    getUserId: function() {
        return wx.getStorageSync("user_id") || 0;
    },
    showSuccess: function(t, o) {
        wx.showToast({
            title: t,
            icon: "success",
            success: function() {
                o && setTimeout(function() {
                    o();
                }, 1500);
            }
        });
    },
    showError: function(t, o) {
        wx.showModal({
            title: "友情提示",
            content: t,
            showCancel: !1,
            success: function(t) {
                o && o();
            }
        });
    },
    _get: function(o, n, e, a, i, r) {
        var s = this;
        wx.showNavigationBarLoading(), n = Object.assign({
            wxapp_id: 10001,
            token: wx.getStorageSync("token")
        }, n);
        var c = function() {
            n.token = wx.getStorageSync("token"), wx.request({
                url: s.api_root + o,
                header: {
                    "content-type": "application/json"
                },
                data: n,
                success: function(o) {
                    if (200 !== o.statusCode || "object" !== t(o.data)) return console.log(o), s.showError("网络请求出错"), 
                    !1;
                    if (-1 === o.data.code) wx.hideNavigationBarLoading(), s.doLogin(); else {
                        if (0 === o.data.code) return s.showError(o.data.msg), !1;
                        e && e(o.data);
                    }
                },
                fail: function(t) {
                    s.showError(t.errMsg, function() {
                        a && a(t);
                    });
                },
                complete: function(t) {
                    wx.hideNavigationBarLoading(), i && i(t);
                }
            });
        };
        r ? s.doLogin(c) : c();
    },
    _post_form: function(o, n, e, a, i) {
        wx.showNavigationBarLoading();
        var r = this;
        n = Object.assign({
            wxapp_id: 10001,
            token: wx.getStorageSync("token")
        }, n), wx.request({
            url: r.api_root + o,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: n,
            success: function(i) {
                return 200 !== i.statusCode || "object" !== t(i.data) ? (r.showError("网络请求出错"), 
                !1) : -1 === i.data.code ? (r.doLogin(function() {
                    r._post_form(o, n, e, a);
                }), !1) : 0 === i.data.code ? (r.showError(i.data.msg, function() {
                    a && a(i);
                }), !1) : void (e && e(i.data));
            },
            fail: function(t) {
                r.showError(t.errMsg, function() {
                    a && a(t);
                });
            },
            complete: function(t) {
                wx.hideLoading(), wx.hideNavigationBarLoading(), i && i(t);
            }
        });
    },
    validateUserInfo: function() {
        wx.getStorageSync("user_info");
        return !!wx.getStorageSync("user_info");
    },
    urlEncode: function(t) {
        var o = [];
        for (var n in t) {
            var e = t[n];
            e.constructor == Array ? e.forEach(function(t) {
                o.push(n + "=" + t);
            }) : o.push(n + "=" + e);
        }
        return o.join("&");
    },
    setTitle: function() {
        var t = this, o = void 0;
        (o = wx.getStorageSync("wxapp")) ? wx.setNavigationBarTitle({
            title: o.navbar.wxapp_title
        }) : t.getWxappBase(function() {
            t.setTitle();
        });
    },
    setNavigationBar: function() {
        this.getWxappBase(function(t) {
            wx.setNavigationBarColor({
                frontColor: t.navbar.top_text_color.text,
                backgroundColor: t.navbar.top_background_color
            });
        });
    },
    getTabBarLinks: function() {
        return n;
    },
    checkIsLogin: function() {
        return "" != wx.getStorageSync("token") && "" != wx.getStorageSync("user_id");
    },
    getUserInfo: function(t, o) {
        var n = this;
        if ("getUserInfo:ok" !== t.detail.errMsg) return !1;
        wx.showLoading({
            title: "正在登录",
            mask: !0
        }), wx.login({
            success: function(e) {
                n._post_form("user/login", {
                    code: e.code,
                    user_info: t.detail.rawData,
                    encrypted_data: t.detail.encryptedData,
                    iv: t.detail.iv,
                    signature: t.detail.signature
                }, function(t) {
                    wx.setStorageSync("token", t.data.token), wx.setStorageSync("user_id", t.data.user_id), 
                    o && o();
                }, !1, function() {
                    wx.hideLoading();
                });
            }
        });
    }
});