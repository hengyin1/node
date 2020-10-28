var t = getApp(), e = require("../../utils/config");

Page({
    data: {
        is_login: !1
    },
    onLoad: function() {
        t.setTitle(), t.setNavigationBar(), this.getIndexData();
        var e = this;
        e.setData({
            is_login: t.checkIsLogin()
        }), console.log(e.data.is_login);
    },
    onShow: function() {
        this.setData({
            is_login: t.checkIsLogin()
        });
    },
    uploadImage: function(t) {
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(i) {
                var o = i.tempFilePaths[0];
                wx.showLoading({
                    title: "图片上传中..."
                }), wx.uploadFile({
                    url: "https://imgapi.faxingwu.com/api/upload",
                    filePath: o,
                    name: "image",
                    formData: {
                        image: o,
                        type: 1,
                        proname: "manhua"
                    },
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(i) {
                        wx.hideLoading();
                        var o = i.data, n = JSON.parse(o);
                        if (101 == n.code) {
                            var s = n.data[0];

                            wx.setStorageSync("userImage", s), a.makeInfo(s, t)
                            // console.log(s), wx.showLoading({
                            //     title: "图片检测中..."
                            // }), wx.request({
                            //     url: e.API_HOST + "/huihua/index/tencent-check",
                            //     data: {
                            //         image: s
                            //     },
                            //     method: "POST",
                            //     header: {
                            //         "Content-Type": "application/x-www-form-urlencoded"
                            //     },
                            //     success: function(e) {
                            //         wx.hideLoading(), "检测成功" == e.data.msg ? (wx.setStorageSync("userImage", s), a.makeInfo(s, t)) : wx.showToast({
                            //             title: e.data.msg,
                            //             icon: "none",
                            //             duration: 1e3
                            //         });
                            //     }
                            // });
                        } else wx.showToast({
                            title: "图片上传失败",
                            icon: "none",
                            duration: 1e3
                        });
                    }
                });
            }
        });
    },
    makeInfo: function(t, a) {
        if ("" == (i = wx.getStorageSync("uid"))) var i = 0;
        wx.showLoading({
            title: "图片绘制中..."
        }), wx.request({
            url: e.API_HOST + "/huihua/result/new-create-image",
            data: {
                uid: i,
                image: t,
                image_id: a
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (console.log(t.data), 101 == t.data.code) {
                    var e = t.data.result_img;
                    wx.hideLoading(), wx.navigateTo({
                        url: "/pages/making/making?result_image=" + e
                    });
                } else wx.hideLoading(), wx.showToast({
                    title: "图片识别失败,请重新上传",
                    icon: "none",
                    duration: 1e3
                });
            }
        });
    },
    upload: function() {
        wx.setStorage({
            key: "image_id",
            data: 8
        }), this.uploadImage(8);
    },
    getUserInfo: function(t) {
        wx.navigateTo({
            url: "../login/login"
        });
    },
    getIndexData: function() {
        var e = this;
        t._get("index/page", {}, function(t) {
            e.setData(t.data);
        });
    },
    imagesHeight: function(t) {
        var e = t.target.dataset.id, a = t.target.dataset.itemKey, i = 750 / (t.detail.width / t.detail.height), o = this.data.imgHeights;
        void 0 === o[a] && (o[a] = {}), o[a][e] = i;
        var n = this.data.imgCurrent;
        void 0 === n[a] && (n[a] = Object.keys(this.data.items[a].data)[0]), this.setData({
            imgHeights: o,
            imgCurrent: n
        });
    },
    bindChange: function(t) {
        var e = t.target.dataset.itemKey, a = this.data.imgCurrent;
        a[e] = t.detail.currentItemId, this.setData({
            imgCurrent: a
        });
    },
    goTop: function(t) {
        this.setData({
            scrollTop: 0
        });
    },
    scroll: function(t) {
        this.setData({
            indexSearch: t.detail.scrollTop
        }), t.detail.scrollTop > 300 ? this.setData({
            floorstatus: !0
        }) : this.setData({
            floorstatus: !1
        });
    },
    onShareAppMessage: function() {
        return {
            title: "小程序首页",
            desc: "",
            path: "/pages/index/index"
        };
    }
});