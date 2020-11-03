var t = getApp(), e = require("../../utils/config");
const util = require("../../utils/util");

Page({
    data: {
        
    },
    onLoad: function() {
        
    },
    onShow: function() {
        util.createInterstitialAd();
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
                        var o = i.data, n = JSON.parse(o);
                        if (101 == n.code) {
                            var s = n.data[0];
                            wx.request({
                                url: e.API_HOST + "/huihua/index/tencent-check",
                                data: {
                                    image: s
                                },
                                method: "POST",
                                header: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                success: function(e) {
                                    wx.hideLoading(), "检测成功" == e.data.msg ? (wx.setStorageSync("userImage", s), a.makeInfo(s, t)) : wx.showToast({
                                        title: e.data.msg,
                                        icon: "none",
                                        duration: 1e3
                                    });
                                }
                            });
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
            title: "生成中..."
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
            data: 25
        }), this.uploadImage(25);
    },
    onShareAppMessage: function() {
        return {
            title: "一键制作卡通头像",
            path: "/pages/index/index",
            imageUrl: ""
        };
    }
});